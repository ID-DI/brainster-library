<?php
session_start();

if(($_SERVER['REQUEST_METHOD']) == "POST")
{
    require_once __DIR__ . "/classes/db.php";
}
else
{
    $_SESSION['error'] = "Only POST requests allowed";
    header("Location:../frontEnd/adminPanelBooks.php");
    die();
}
if(empty(($_POST['editAuthor']) || ($_POST['editTitle']) || ($_POST['editAuthor']) || ($_POST['editYear_publication']) || ($_POST['editPages']) || ($_POST['editCategory']) || ($_POST['editCover'])))
{
    $_SESSION['error'] = "Please fill all the fileds before submiting";
        header("Location:../frontEnd/adminPanelBooks.php");
        die();
}

$pdo->query('SET foreign_key_checks = 0');
$id = $_POST['editId'];
$sql = "UPDATE books SET 
        title=:title,
        author_id=:author_id,
        year_publication=:year_publication,
        pages=:pages,
        category_id=:category_id,
        cover=:cover
        WHERE id = {$id}";

$stmt = $pdo->prepare($sql);
if($stmt->execute([
    'title'=>$_POST['editTitle'],
    'author_id'=>$_POST['editAuthor'],
    'year_publication'=>$_POST['editYear_publication'],
    'pages'=>$_POST['editPages'],
    'category_id'=>$_POST['editCategory'],
    'cover'=>$_POST['editCover']]))
{
    $sql = "SELECT books.id, books.title, author.author AS author, books.year_publication, books.pages, books.cover, category.category FROM books LEFT JOIN author ON books.author_id = author.id LEFT JOIN category ON books.category_id = category.id 
    WHERE books.id = $id";
    $stmt = $pdo->query($sql);
    $updatedEntry = $stmt->fetch();
    echo json_encode(['bookUpdated'=>$updatedEntry,'success'=>1]); 
}
else
{
    echo json_encode(['success'=>0]);
}
$pdo->query('SET foreign_key_checks = 1');