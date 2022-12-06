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
if(empty(($_POST['soft_delete']) || ($_POST['status_comm'])))
{
    $_SESSION['error'] = "Please fill all the fileds before submiting";
        header("Location:../frontEnd/adminPanelCategory.php");
        die();
}

$pdo->query('SET foreign_key_checks = 0');

$id=$_POST['id'];
$soft_delete=$_POST['soft_delete'];
$status = $_POST['status_comm'];

$sql = "UPDATE public_comments SET 
        status_comm=:status_comm,
        soft_delete=:soft_delete
        WHERE id = {$id}";

$stmt = $pdo->prepare($sql);
if($stmt->execute([
    'soft_delete' => $_POST['soft_delete'],  
    'status_comm' => $_POST['status_comm']  
]))
{
    $sql = "SELECT public_comments.id, public_comments.commentary,  public_comments.status_comm, public_comments.soft_delete, users.user_name AS user, books.title 
    FROM public_comments 
    LEFT JOIN users ON public_comments.user_id = users.id 
    LEFT JOIN books ON public_comments.book_id = books.id 
    WHERE public_comments.id = {$id}";
    $stmt = $pdo->query($sql);
    $data = $stmt->fetch();
    echo json_encode(['p_comment'=>$data,'success'=>1]); 
}
else
{
    echo json_encode(['success'=>0]);
}
$pdo->query('SET foreign_key_checks = 1');