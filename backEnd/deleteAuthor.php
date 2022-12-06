<?php
session_start();
require_once __DIR__ . "/classes/db.php";

if(!isset($_SESSION['admin']))
{
    $_SESSION['error'] = "You aren't allowed.";
    header("Location:index.php");
    die();
}

if(($_SERVER['REQUEST_METHOD']) == "POST")
{
    require_once __DIR__ . "/classes/db.php";
}
else
{
    $_SESSION['error'] = "Only POST requests allowed";
    header("Location:/../frontEnd/adminPanel.php");
    die();
}
$pdo->query('SET foreign_key_checks = 0');
$id=$_POST['id'];
$sql = "UPDATE author 
SET soft_delete = :soft_delete
WHERE id = {$id}";
$stmt = $pdo->prepare($sql);
if($stmt->execute([
    'soft_delete' => $_POST['soft_delete']  
]))
{
    echo json_encode(['success'=>1]);
    
    $sql = "UPDATE books 
    SET soft_delete = :soft_delete
    WHERE author_id = {$id}";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['soft_delete'=>1]);
}
else
{
    echo json_encode(['success'=>0]);
}  
$pdo->query('SET foreign_key_checks = 1');