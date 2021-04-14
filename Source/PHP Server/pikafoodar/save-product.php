<?php

include 'database-config.php';

$message = '';

$connection = new mysqli($host_name, $host_user, $host_password, $database_name);

if ($connection->connect_error) {
 die("Connection failed: " . $connection->connect_error);
}

$json = json_decode(file_get_contents('php://input'), true);

$userId = intval($json['userId']);

$json = json_decode(file_get_contents('php://input'), true);
$query = "INSERT INTO label_rat(LABEL_NAME, FREQ_CONS, ADDT_SCORE, DIET_DISE_SCORE, USER_ID, DATE, TIME) VALUES ('$json[labelName]', '$json[freqCons]', $json[addtScore], $json[dietDiseScore], $userId, '$json[date]', '$json[time]')";
$query_result = $connection->query($query);

$query = "SELECT LABEL_ID FROM label_rat ORDER BY LABEL_ID DESC LIMIT 1";
$query_result = $connection->query($query);

if ($query_result->num_rows > 0) {
  while($row[] = $query_result->fetch_assoc()) {
    $item = $row;
    $json = json_encode($item);
  }
}

else {
  $item = array('message' => 'Product saving unsuccessful. Please try again later.');
  $json = json_encode($item);
}

echo $json;
$connection->close();
