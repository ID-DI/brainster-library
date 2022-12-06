<?php
session_start();

if(($_SERVER['REQUEST_METHOD']) == "POST")
{
    require_once __DIR__ . "/classes/db.php";
}
else
{
    $_SESSION['error'] = "Only POST requests allowed";
    header("Location:../frontEnd/adminPanelAuthor.php");
    die();
}
if(empty(($_POST['author']) || ($_POST['id'])))
{
    $_SESSION['error'] = "Please fill all the fileds before submiting";
        header("Location:../frontEnd/adminPanelAuthor.php");
        die();
}

$author = $_POST['author'];
$id = $_POST['id'];
$bio = $_POST['bio'];

$sql = "UPDATE author 
SET 
author=:author,
biography=:biography
WHERE id = {$id}";
$stmt = $pdo->prepare($sql);
if($stmt->execute([
    'author' => $_POST['author'],  
    'biography' => $_POST['bio'],  
]))
{
    $sql = "SELECT * FROM author WHERE id=$id";
    $stmt = $pdo->query($sql);
    $updatedEntry = $stmt->fetch();
    echo json_encode(['author'=>$updatedEntry,'success'=>1]); 
}
else
{
    echo json_encode(['success'=>0]);
}