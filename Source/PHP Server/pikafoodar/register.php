<?php

include 'database-config.php';

$message = '';

$connection = new mysqli($host_name, $host_user, $host_password, $database_name);

if ($connection->connect_error) {
 die("Connection failed: " . $connection->connect_error);
}

$json = json_decode(file_get_contents('php://input'), true);
$query = "INSERT INTO user(EMAIL, PASSWORD, USERNAME, AGE, GENDER, COUNTRY, OCCUPATION)
VALUES ('$json[email]', '$json[password]', '$json[username]', '$json[age]', '$json[gender]', '$json[country]', '$json[occupation]')";
$query_result = $connection->query($query);

$query = "SELECT LAST_INSERT_ID()";
$query_result = $connection->query($query);

if ($query_result->num_rows > 0) {
  while($row[] = $query_result->fetch_assoc()) {
    $item = $row;
    $json = json_encode($item);
  }
}

else {
  $item = array('message' => 'Registration is unsuccessful. Please try again later.');
  $json = json_encode($item);
}

echo $json;
$connection->close();
