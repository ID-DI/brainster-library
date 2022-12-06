<?php
session_start();

// if(!isset($_SESSION['admin']))
// {
//     $_SESSION['error'] = "You aren't allowed.";
//     header("Location:../frontEnd/index.php");
//     die();
// }
    require_once __DIR__ . "../../backEnd/classes/db.php";
    $stmt = $pdo->query("SELECT * FROM author WHERE soft_delete = 0");
    $data = $stmt->fetchAll();
    echo json_encode($data);