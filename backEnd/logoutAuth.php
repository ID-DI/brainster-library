<?php
session_start();
if(!isset($_SESSION['user']) || !isset($_SESSION['admin']))
{
    header("Location:../frontEnd/index.php");
    die();
}
else
{
    require_once __DIR__ . "/classes/db.php";
    require_once __DIR__ . "/classes/header.php";
}

session_destroy();
header("Location:../frontEnd/index.php");
die();
