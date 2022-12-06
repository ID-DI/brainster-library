<?php
session_start();
if(!isset($_SESSION['admin']))
{
    $_SESSION['error'] = "You aren't allowed.";
    header("Location:../frontEnd/index.php");
    die();
}

if(($_SERVER['REQUEST_METHOD']) == "POST")
{
    require_once __DIR__ . "/classes/db.php";
}
else
{
    $_SESSION['error'] = "Only POST requests allowed";
    header("Location:../frontEnd/index.php");
    die();
}

$pdo->query('SET foreign_key_checks = 0');

$id=$_POST['id'];
$soft_delete=$_POST['soft_delete'];
$status = $_POST['status_comm'];

$sql = "UPDATE public_comments 
SET soft_delete = :soft_delete, status_comm = :status_comm
WHERE id = {$id}";
$stmt = $pdo->prepare($sql);
if($stmt->execute([
    'soft_delete' => $_POST['soft_delete'],  
    'status_comm' => $_POST['status_comm']  
]))
{
    $stmt = $pdo->query("SELECT public_comments.id, public_comments.commentary,  public_comments.status, users.user_name AS user, books.title 
    FROM public_comments 
    LEFT JOIN users ON public_comments.user_id = users.id 
    LEFT JOIN books ON public_comments.book_id = books.id 
    WHERE public_comments.status='0';");
    $data = $stmt->fetch();
    echo json_encode(['deleted'=>$data,'success'=>1]); 
}
else
{
    echo json_encode(['success'=>0]);
}
$pdo->query('SET foreign_key_checks = 1'); 