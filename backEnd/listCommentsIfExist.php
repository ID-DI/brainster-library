<?php
session_start();
require_once __DIR__ . "../../backEnd/classes/db.php";
// if(!isset($_SESSION['user']) || !isset($_SESSION['admin']))
// {
//     $_SESSION['error'] = "You aren't allowed.Please sign in.";
//     header("Location:../frontEnd/index.php");
//     die();
// }


$comment = $_POST['input'];
$userId = $_POST['user_id'];
$bookId = $_POST['book_id'];

  
    $stmt = $pdo->query("SELECT public_comments.id, public_comments.commentary, public_comments.status_comm, public_comments.soft_delete, public_comments.book_id, user_id, book_id
    FROM public_comments 
    LEFT JOIN users ON public_comments.user_id = users.id 
    LEFT JOIN books ON public_comments.book_id = books.id 
    WHERE user_id = '$userId' AND book_id = '$bookId';");
    $data = $stmt->fetch();
    $rowCount = $stmt->rowCount();
  
    if($rowCount > 0)
    {
        echo json_encode(['success'=>3]);
        die();
    }
    else
    {
        $sql = "INSERT INTO public_comments(commentary, user_id, book_id)  VALUES(:commentary, :user_id, :book_id)";
        $stmt = $pdo->prepare($sql);
        if($stmt->execute([
            'commentary' => $_POST['input'],  
            'user_id' => $_POST['user_id'],  
            'book_id' => $_POST['book_id']
        ]))
        {
            echo json_encode(['success'=>2]);
        }
    } 


    