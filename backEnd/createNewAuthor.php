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

if(empty($_POST['author']) || empty($_POST['bio']))
{
    $_SESSION['error'] = "Please fill all the fileds before submiting";
        header("Location:../frontEnd/adminPanelAuthor.php");
        die();
}

$author = $_POST['author'];
$bio = $_POST['bio'];
//dodadeni
$sql = "SELECT author FROM author WHERE author = '$author'";
$stmt = $pdo->prepare($sql);
$stmt = $pdo->query($sql);
$controlAuthor = $stmt->fetch();
$rowCount = $stmt->rowCount();

if($rowCount > 0)
{
    echo json_encode(['success'=>2]);   //ako resavame preku javascript
    // $_SESSION['error'] = "There is author with that name in our database, but it has been deleted.";
    // header("Location:../frontEnd/adminPanelAuthor.php");     //ako resavame preku php
    die();
}
//dodeni
$sql = "INSERT INTO author(author,biography) VALUES(:author, :biography)";
$stmt = $pdo->prepare($sql);
if($stmt->execute([
    'author' => $_POST['author'],  
    'biography' => $_POST['bio'] 
]))
{
    $last_id =  $pdo->lastInsertId();
    $sql = "SELECT * FROM author WHERE id = $last_id";
    $stmt = $pdo->query($sql);
    $lastEntry = $stmt->fetch();

    echo json_encode(['author'=>$lastEntry,'success'=>1]);
}
else
{
    echo json_encode(['success'=>0]);
}