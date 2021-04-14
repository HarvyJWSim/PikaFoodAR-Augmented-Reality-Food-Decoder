<?php

include 'database-config.php';

$message = '';

$connection = new mysqli($host_name, $host_user, $host_password, $database_name);

if ($connection->connect_error) {
 die("Connection failed: " . $connection->connect_error);
}

$json = json_decode(file_get_contents('php://input'), true);

$userId = intval($json['userId']);

$query = "SELECT * FROM label_rat WHERE USER_ID = $userId ORDER BY DATE DESC";

$query_result = $connection->query($query);

if ($query_result->num_rows > 0) {
  while($row[] = $query_result->fetch_assoc()) {
    $item = $row;
    $json = json_encode($item);
  }
}

else {
  $item = array('message' => 'Additive Evaluation Unsuccessful.');
  $json = json_encode($item);
}

echo $json;
$connection->close();
