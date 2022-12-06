<?php
    try 
    {
        $pdo = new \PDO("mysql:host=127.0.0.1;dbname=brainster_library", "root", "", [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
    } 
    catch (\PDOException $e) 
    {
        $msg = date("Y-m-d H:i:s") . $e->getMessage();
        file_put_contents("log.txt", $msg . PHP_EOL, FILE_APPEND);
        header("Location:/404.php");
        die();
    }