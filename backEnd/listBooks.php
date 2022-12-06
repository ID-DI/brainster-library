<?php
session_start();

// if(!isset($_SESSION['admin']))
// {
//     $_SESSION['error'] = "You aren't allowed.";
//     header("Location:../frontEnd/index.php");
//     die();
// }

    require_once __DIR__ . "../../backEnd/classes/db.php";
    $stmt = $pdo->query("SELECT books.id, books.title, author.author AS author, author.biography AS biography, books.year_publication, books.pages, books.cover, category.category 
    FROM books LEFT JOIN author ON books.author_id = author.id 
    LEFT JOIN category ON books.category_id = category.id 
    WHERE books.soft_delete='0';");
    $data = $stmt->fetchAll();
    echo json_encode($data);