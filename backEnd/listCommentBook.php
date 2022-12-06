<?php
session_start();

require_once __DIR__ . "../../backEnd/classes/db.php";

$bookId = $_POST['book'];

$stmt = $pdo->query("SELECT public_comments.id, public_comments.commentary,  public_comments.status_comm, public_comments.soft_delete, public_comments.book_id, users.user_name AS user, books.title, public_comments.user_id
FROM public_comments
LEFT JOIN users ON public_comments.user_id = users.id 
LEFT JOIN books ON public_comments.book_id = books.id 
WHERE public_comments.book_id = '$bookId';");
$data = $stmt->fetchAll();

echo json_encode(['comments'=>$data,'success'=>1]);


