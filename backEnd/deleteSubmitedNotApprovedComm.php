<?php
session_start();
// if(!isset($_SESSION['user']))
// {
//     $_SESSION['error'] = "You aren't allowed to delete.";
//     header("Location:../frontEnd/index.php");
//     die();
// }

$id = $_POST['id'];

if(($_SERVER['REQUEST_METHOD']) == "POST")
{
    require_once __DIR__ . "/classes/db.php";
}
else
{
    $_SESSION['error'] = "Only POST requests allowed";
    header("Location:/../frontEnd/index.php");
    die();
}

$pdo->query('SET foreign_key_checks = 0');

$sql = "DELETE FROM public_comments 
WHERE (id = :id)
LIMIT 1";
$stmt = $pdo->prepare($sql);
if($stmt->execute([
    'id' => $_POST['id']  
]))
{
    echo json_encode(['success'=>1]); 
}

$pdo->query('SET foreign_key_checks = 1');  