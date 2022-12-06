<?php
if(($_SERVER['REQUEST_METHOD']) == "POST")
{
    require_once __DIR__ . "/classes/db.php";
}
else
{
    $_SESSION['error'] = "Only POST requests allowed";
    header("Location:../frontEnd/adminPanelAuthor.php");
    die();
}

$input = $_POST['input'];
$book_id = $_POST['book_id'];
$user_id = $_POST['user_id'];

if(empty($_POST['input']))
{
    echo json_encode(['success'=>2]);
    die();
}

$sql = "INSERT INTO personal_comments(commentary, user_id, book_id) VALUES(:commentary, :user_id, :book_id)";
$stmt = $pdo->prepare($sql);
if($stmt->execute([
    'commentary' => $_POST['input'],
    'user_id' => $_POST['user_id'],
    'book_id' => $_POST['book_id']
]))
{
    $last_id = $pdo->lastInsertId();
    $sql = "SELECT * FROM personal_comments WHERE id = $last_id";
    $stmt = $pdo->query($sql);
    $lastEntry = $stmt->fetch();
    echo json_encode(['personalComment'=>$lastEntry,'success'=>1]);
}
else
{
    echo json_encode(['success'=> 0]);
}