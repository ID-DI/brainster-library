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
if(empty($_POST['input']))
{
    $_SESSION['error'] = "Please fill all the fileds before submiting";
        header("Location:../frontEnd/adminPanelCategory.php");
        die();
}

$pdo->query('SET foreign_key_checks = 0');

$id=$_POST['id'];
$user_id=$_POST['user_id'];
$input=$_POST['input'];

$sql = "UPDATE personal_comments SET 
        commentary=:commentary
        WHERE id = {$id}";

$stmt = $pdo->prepare($sql);
if($stmt->execute([
    'commentary' => $_POST['input']   
]))
{
    $sql = "SELECT * 
    FROM personal_comments 
    WHERE id = '$id' AND user_id = '$user_id'";
    $stmt = $pdo->query($sql);
    $data = $stmt->fetch();
    echo json_encode(['p_comment'=>$data,'success'=>1]); 
}
else
{
    echo json_encode(['success'=>0]);
}
$pdo->query('SET foreign_key_checks = 1');