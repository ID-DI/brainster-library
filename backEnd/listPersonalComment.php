<?php
session_start();

if($_SERVER['REQUEST_METHOD'] == "POST")
{
    require_once __DIR__ . "/classes/db.php";

}
else
{
    $_SESSION['error'] = "Only POST requests.";
    header("Location:../frontEnd/index.php");
    die();
}
// if(!isset($_SESSION['user']))
// {
//     $_SESSION['error'] = "You aren't allowed.";
//     header("Location:../frontEnd/index.php");
//     die();
// }

$id = $_POST['id'];
$bookId = $_POST['idBook'];
    $stmt = $pdo->query("SELECT * FROM personal_comments WHERE user_id = '$id' AND book_id = '$bookId'");
    $data = $stmt->fetchAll();
    echo json_encode(['personalComment'=>$data,'success'=>1]);