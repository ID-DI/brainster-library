<?php
if(($_SERVER['REQUEST_METHOD']) == "POST")
{
    require_once __DIR__ . "/classes/db.php";

}
else
{
    $_SESSION['error'] = "Only POST requests allowed";
    header("Location:/../frontEnd/adminPanel.php");
    die();
}
if(empty($_POST['author']))
{
    $_SESSION['error'] = "Please fill all the fileds before submiting";
        header("Location:../frontEnd/adminPanel.php");
        die();
}


$title = $_POST['title'];
$author = $_POST['author'];
$year_publication = $_POST['year_publication'];
$pages = $_POST['pages'];
$category = $_POST['category'];
$cover = $_POST['cover'];


//dodadeni
$sql = "SELECT * FROM books WHERE title = '$title'";
$stmt = $pdo->prepare($sql);
$stmt = $pdo->query($sql);
$controlTitle = $stmt->fetch();
$rowCount = $stmt->rowCount();

if($rowCount > 0) 
{
    echo json_encode(['success'=>2]); // ako odime so javascript
    // $_SESSION['error'] = "There is book with that title in our database.";
    // header("Location:../frontEnd/adminPanelBooks.php"); // ako odime so PHP
    die();
}
//dodadeni

$sql = "INSERT INTO books(title, author_id, year_publication, pages, cover, category_id) VALUES(:title, :author_id, :year_publication, :pages, :cover, :category_id)";
$stmt = $pdo->prepare($sql);
if($stmt->execute([
    'title'=>$_POST['title'],
    'author_id'=>$_POST['author'],
    'year_publication'=>$_POST['year_publication'],
    'pages'=>$_POST['pages'],
    'cover'=>$_POST['cover'],
    'category_id'=>$_POST['category']

]))
{
    $last_id =  $pdo->lastInsertId();
    $sql = "SELECT books.id, books.title, author.author AS author, books.year_publication, books.pages, books.cover, category.category 
            FROM books LEFT JOIN author ON books.author_id = author.id 
            LEFT JOIN category ON books.category_id = category.id 
            WHERE  books.id = $last_id";
    $stmt = $pdo->query($sql);
    $lastEntry = $stmt->fetch();


    echo json_encode(['newBooks'=>$lastEntry,'success'=>1]);

}
else
{
    echo json_encode(['success'=>0]);
}