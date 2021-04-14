<?php

include 'database-config.php';

$message = '';

$connection = new mysqli($host_name, $host_user, $host_password, $database_name);

if ($connection->connect_error) {
 die("Connection failed: " . $connection->connect_error);
}

$json = json_decode(file_get_contents('php://input'), true);

$ingdId = intval($json['ingdId']);
$labelId = intval($json['labelId']);
$json = json_decode(file_get_contents('php://input'), true);
$query = "INSERT INTO ingd_item(INGD_ID, LABEL_ID) VALUES ($ingdId, $labelId)";
$query_result = $connection->query($query);

if ($query_result === true) {
  $item = array('message' => 'Product label saved');
  $json = json_encode($item);
}

else {
  $item = array('message' => 'Product label saving unsuccessful. Please try again later.');
  $json = json_encode($item);
}

echo $json;
$connection->close();
