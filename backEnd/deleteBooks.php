<?php
session_start();
require_once __DIR__ . "/classes/db.php";

if(!isset($_SESSION['admin']))
{
    $_SESSION['error'] = "You aren't allowed.";
    header("Location:../frontEnd/adminPanel.php");
    die();
}

if(($_SERVER['REQUEST_METHOD']) == "POST")
{
    require_once __DIR__ . "/classes/db.php";
}
else
{
    $_SESSION['error'] = "Only POST requests allowed";
    header("Location:../frontEnd/adminPanel.php");
    die();
}

$pdo->query('SET foreign_key_checks = 0');

$id=$_POST['id'];
$sql = "UPDATE books 
SET soft_delete = :soft_delete
WHERE id = {$id}";
$stmt = $pdo->prepare($sql);
if($stmt->execute([
    'soft_delete' => $_POST['soft_delete']  
]))
{
    echo json_encode(['success'=>1]);
    //brisenje comentari
    $sql = "UPDATE public_comments 
    SET soft_delete = :soft_delete, status_comm = :status_comm
    WHERE book_id = {$id}";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['soft_delete'=>'1']); 

    $sql = "DELETE FROM personal_comments 
    WHERE book_id = {$id}";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $_POST['id']]);
}
else
{
    echo json_encode(['success'=>0]);
}
$pdo->query('SET foreign_key_checks = 1');  