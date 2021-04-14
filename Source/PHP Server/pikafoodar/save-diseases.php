<?php

include 'database-config.php';

$message = '';

$connection = new mysqli($host_name, $host_user, $host_password, $database_name);

if ($connection->connect_error) {
 die("Connection failed: " . $connection->connect_error);
}

$json = json_decode(file_get_contents('php://input'), true);

$userId = intval($json['userId']);
$diseaseList = $json['diseaseList'];
$diseaseListLen = count($diseaseList);

for ($i = 0; $i < $diseaseListLen; $i++) {
  $temp = intval($diseaseList[$i]);
  $query = "INSERT INTO user_risk_dise(USER_ID, DISE_ID) VALUES ($userId, $temp)";
  $query_result = $connection->query($query);
}

if ($query_result === true) {
  $item = array('message' => 'Diseases list saved');
  $json = json_encode($item);
}
else {
  $item = array('message' => 'Saving of disease list is unsuccessful. Please try again later.');
  $json = json_encode($item);
}

echo $json;
$connection->close();
