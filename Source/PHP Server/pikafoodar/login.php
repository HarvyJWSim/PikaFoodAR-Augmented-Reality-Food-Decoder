<?php

include 'database-config.php';

$message = '';

$connection = new mysqli($host_name, $host_user, $host_password, $database_name);

if ($connection->connect_error) {
 die("Connection failed: " . $connection->connect_error);
}

$jsonDecoded = json_decode(file_get_contents('php://input'), true);
$query = "SELECT PASSWORD, USER_ID FROM USER WHERE USERNAME = '$jsonDecoded[username]'";
$query_result = $connection->query($query);
$password = "";
if ($query_result->num_rows > 0) {
  if($row = $query_result->fetch_assoc()) {
    $password = $row["PASSWORD"];
    $id = intval($row["USER_ID"]);
  }
}

if ($password == $jsonDecoded['password']) {
  $query = "SELECT USER_ID, DISE_ID FROM user_risk_dise WHERE USER_ID = $id";
  $query_result = $connection->query($query);

  if ($query_result->num_rows > 0) {
    while($row2[] = $query_result->fetch_assoc()) {
      $item = $row2;
      $json = json_encode($item);
    }
  }
  else {
    $item = array('userId' => $id);
    $json = json_encode($item);
    }
  }
else {
  $item = array('message' => 'Login is unsuccessful. Please verify your username and password.');
  $json = json_encode($item);
}

echo $json;
$connection->close();
