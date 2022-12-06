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
if(!isset($_SESSION['admin']))
{
    $_SESSION['error'] = "You aren't allowed.";
    header("Location:../frontEnd/index.php");
    die();
}
    $stmt = $pdo->query("SELECT * FROM users WHERE 1");
    $data = $stmt->fetchAll();
    echo json_encode($data);