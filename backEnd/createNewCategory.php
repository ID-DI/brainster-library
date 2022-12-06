<?php
if(($_SERVER['REQUEST_METHOD']) == "POST")
{
    require_once __DIR__ . "/classes/db.php";

}
else
{
    $_SESSION['error'] = "Only POST requests allowed";
    header("Location:/../frontEnd/adminPanelCategory.php");
    die();
}
if(empty($_POST['category']))
{
    $_SESSION['error'] = "Please fill all the fileds before submiting";
        header("Location:/../frontEnd/adminPanelCategory.php");
        die();
}
$category = $_POST['category'];
//dodadeni
$sql = "SELECT category FROM category WHERE category = '$category'";
$stmt = $pdo->prepare($sql);
$stmt = $pdo->query($sql);
$controlCategory = $stmt->fetch();
$rowCount = $stmt->rowCount();

if($rowCount > 0) 
{
    echo json_encode(['success'=>2]); // ako odime so javascript
    // $_SESSION['error'] = "That category is in our database.";
    // header("Location:../frontEnd/adminPanelCategory.php"); // ako odime so PHP
    die();
}
//dodadeni




$sql = "INSERT INTO category(category) VALUES(:category)";
$stmt = $pdo->prepare($sql);
if($stmt->execute([
    'category' => $_POST['category']  
]))
{
    $last_id =  $pdo->lastInsertId();
    $sql = "SELECT * FROM category WHERE id = $last_id";
    $stmt = $pdo->query($sql);
    $lastEntry = $stmt->fetch();
    echo json_encode(['newCategory'=>$lastEntry,'success'=>1]);
}
else
{
    echo json_encode(['success'=> 0]);
}