<?php

include 'database-config.php';

$message = '';

$connection = new mysqli($host_name, $host_user, $host_password, $database_name);

if ($connection->connect_error) {
 die("Connection failed: " . $connection->connect_error);
}

$json = json_decode(file_get_contents('php://input'), true);

$query = "SELECT ingredient.INGD_ID, ingd_alt_name.INGD_NAME, adtInfo.ADD_FUNC, adtInfo.ADD_INFO, adtInfo.ADD_EVAL_ID,
                 adtInfo.CTRY_ID, ingd_risk.DISE_ID, ingd_risk.INGD_RECOM FROM ingredient
          LEFT JOIN ingd_alt_name ON ingredient.INGD_ID = ingd_alt_name.INGD_ID
          LEFT JOIN ingd_risk ON ingredient.INGD_ID = ingd_risk.INGD_ID
          LEFT JOIN (SELECT additive.INGD_ID, additive.ADD_FUNC, additive.ADD_INFO, additive.ADD_EVAL_ID,
                    addt_appv.CTRY_ID FROM additive LEFT JOIN addt_appv ON additive.INGD_ID = addt_appv.INGD_ID)
                    AS adtInfo
          ON ingredient.INGD_ID = adtInfo.INGD_ID
          WHERE ingredient.INGD_ID = $json[ingdId]";

$query_result = $connection->query($query);

if ($query_result->num_rows > 0) {
  while($row[] = $query_result->fetch_assoc()) {
    $item = $row;
    $json = json_encode($item);
  }
}
else {
  $item = array('message' => 'Detail Evaluation Unsucessful.');
  $json = json_encode($item);
}
echo $json;
$connection->close();
