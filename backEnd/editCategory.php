<?php
session_start();

if(($_SERVER['REQUEST_METHOD']) == "POST")
{
    require_once __DIR__ . "/classes/db.php";
}
else
{
    $_SESSION['error'] = "Only POST requests allowed";
    header("Location:../frontEnd/adminPanelCategory.php");
    die();
}
if(empty(($_POST['category']) || ($_POST['id'])))
{
    $_SESSION['error'] = "Please fill all the fileds before submiting";
        header("Location:../frontEnd/adminPanelCategory.php");
        die();
}

$newCategory = $_POST['category'];
$id = $_POST['id'];

$sql = "UPDATE category 
SET category = :category
WHERE id = {$id}";
$stmt = $pdo->prepare($sql);
if($stmt->execute([
    'category' => $_POST['category']  
]))
{
    $sql = "SELECT * FROM category WHERE id = $id";
    $stmt = $pdo->query($sql);
    $updatedEntry = $stmt->fetch();
    echo json_encode(['updatedCategory'=>$updatedEntry,'success'=>1]); 
}
else
{
    echo json_encode(['success'=>0]);
}