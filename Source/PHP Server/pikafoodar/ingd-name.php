<?php

include 'database-config.php';

function convertToUTF8($mixedIngdName) {
    if (is_array($mixedIngdName)) {
        foreach ($mixedIngdName as $key => $value) {
            $mixedIngdName[$key] = convertToUTF8($value);
        }
    } elseif (is_string($mixedIngdName)) {
        return mb_convert_encoding($mixedIngdName, "UTF-8", "UTF-8");
    }
    return $mixedIngdName;
}

$message = '';

$connection = new mysqli($host_name, $host_user, $host_password, $database_name);

if ($connection->connect_error) {
 die("Connection failed: " . $connection->connect_error);
}

$json = json_decode(file_get_contents('php://input'), true);
$token = $json['token'];
$query = "SELECT INGD_NAME FROM ingd_alt_name";

$query_result = $connection->query($query);
$nameArray = array();
$ingdName;
$levenVal;
$levenMin = 99;
$ingdNameWithMinLeven;

if ($query_result->num_rows > 0) {
  while($row = $query_result->fetch_array()) {
    $ingdName = $row['INGD_NAME'];
    $levenVal = levenshtein($ingdName, $token, 2, 1, 3);
  if ($levenVal < $levenMin) {
    $levenMin = $levenVal;
    $ingdNameWithMinLeven = $ingdName;
    if ($levenVal = 0)
      break;
  }
    // $json = json_encode(convertToUTF8($item));
  }

    if ($levenMin <= 3) {
      $item = array('ingdName' => $ingdNameWithMinLeven, 'initIngdName' => $token);
      $json = json_encode($item);
    }
    else {
      $item = array('ingdName' => "Mismatch");
      $json = json_encode($item);
    }
}

else {
  $item = array('message' => 'Ingredient Names Retrieving Unsuccessful.');
  $json = json_encode($item);
}

echo $json;
$connection->close();
