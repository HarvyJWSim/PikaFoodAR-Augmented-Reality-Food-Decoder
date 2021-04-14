<?php

include 'database-config.php';

$message = '';

$connection = new mysqli($host_name, $host_user, $host_password, $database_name);

if ($connection->connect_error) {
 die("Connection failed: " . $connection->connect_error);
}

$json = json_decode(file_get_contents('php://input'), true);

$query = "SELECT * FROM user where USERNAME = '$json[username]'";
$query_result = $connection->query($query);

if ($query_result -> num_rows > 0) {
  $item = array('message' => 'Username is unavailable. Kindly provide another username.');
  $json = json_encode($item);
}
else {
  $item = array('message' => 'Username available');
  $json = json_encode($item);
}

echo $json;
$connection->close();
