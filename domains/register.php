<?php

include 'database-config.php';

$message = '';

$connection = new mysqli($host_name, $host_user, $host_password, $database_name);

if ($connection->connect_error) {
 die("Connection failed: " . $connection->connect_error);
}

$json = json_decode(file_get_contents('php://input'), true);

$query = "SELECT * FROM user";
//$query = "INSERT INTO user(USERNAME, PASSWORD) values('$json[]', '$json[]')";

$query_result = $connection->query($query);

if ($query_result === true) {
 $message = 'Account registration success!';
}

else {
 $message = 'Account registration failed. Try again later.';
}

echo json_encode($message);

$connection->close();
