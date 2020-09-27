<?php
require __DIR__ . '/vendor/autoload.php';
use Curl\Curl;

header("Access-Control-Allow-Headers: *");
header('Content-type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
$_POST = json_decode(file_get_contents("php://input"),true);

//DB creds removed

$errors = array();

function checkUrl($url) {  
  if (filter_var($url, FILTER_VALIDATE_URL) === FALSE) {
    return false;
  }
}

if (isset($_GET['checkLink']) && !empty($_GET['checkLink'])) {
  $url = trim($_GET['checkLink']);

  if (empty($url)) {
    array_push($errors, "Please enter a valid URL");
  }
  
  if (checkUrl($url) === False) {
    array_push($errors, 'Invalid URL');
  }

  if (count($errors) == 0) {
    $curl = new Curl();
    $curl->get($url);
    
    if ($curl->error) {
        echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
    } else {
        echo json_encode($curl->get($url));
    }

  } else {
    echo json_encode($errors);
  }
}
else if (isset($_GET['shortenLink']) && !empty($_GET['shortenLink'])) {
  $url = trim($_GET['shortenLink']);

  if (empty($url)) {
    array_push($errors, "Please enter a valid URL");
  }
  
  if (checkUrl($url) === False) {
    array_push($errors, 'Invalid URL');
  }

  if (count($errors) == 0) {
    echo json_encode("Our new link");
  }

}
else if (isset($_POST['uploadObject']) && !empty($_POST['uploadObject'])) {
  $obj = $_POST['uploadObject'];
  $query = "INSERT INTO links (object)
  VALUES('$obj')";
  mysqli_query($db, $query);
  echo json_encode("Uploaded");
}
else if (isset($_POST['getLinks'])) {
  $query = "SELECT * FROM links";
  $results = mysqli_query($db, $query);
  $x = array();
  while($row = $results->fetch_assoc()) {
    array_push($x, $row['object']);
  }
  echo json_encode($x);
}
else {
  array_push($errors, "Error");
  echo json_encode($errors);
}


?>
