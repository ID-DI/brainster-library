<?php
session_start();

// if(!isset($_SESSION['user']) || !isset($_SESSION['admin']))
// {
//     $_SESSION['error'] = "You aren't allowed.Please sign in.";
//     header("Location:../frontEnd/index.php");
//     die();
// }

$id = $_POST['id'];

    require_once __DIR__ . "../../backEnd/classes/db.php";
    $stmt = $pdo->query("SELECT public_comments.id, public_comments.commentary, public_comments.status_comm, public_comments.soft_delete, public_comments.book_id, user_id, books.title
    FROM public_comments 
    LEFT JOIN users ON public_comments.user_id = users.id 
    LEFT JOIN books ON public_comments.book_id = books.id 
    WHERE user_id = '$id';");
    $data = $stmt->fetch();
    echo json_encode(['id'=>$data,'success'=>1]);
    
    