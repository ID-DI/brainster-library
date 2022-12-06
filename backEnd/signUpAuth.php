<?php
session_start();

if($_SERVER['REQUEST_METHOD'] == "POST")
{
    require_once __DIR__ . "/classes/db.php";   
}
else
{
    $_SESSION['error'] = "Only POST requests.";
    header("Location:../frontEnd/index.php");
    die();
}

$email = $_POST['email'];
$pass = $_POST['pass'];

if(empty($email) || empty($pass))
{
    $_SESSION['error'] = "Please fill all the fileds before submiting";
    header("Location:../frontEnd/index.php");
    die();
};

$email = filter_var($email, FILTER_SANITIZE_EMAIL);

$regex = "/^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/";
if(preg_match($regex, $email) == false)
{
    $_SESSION['error'] = "Please enter valid email - email adress";
    header("Location:../frontEnd/index.php");
    die();
}

$pattern = '/^(?=.*[!@#$%^&*-])(?=.*[0-9])(?=.*[A-Z]).{8,20}$/';
if(!preg_match($pattern, $pass))
{
    $_SESSION['error'] = "The password has to have at least one special signe one capital letter and small leter and one number and sholud be between 8 and 20 characters long";
    header("Location:../frontEnd/index.php");
    die();
} 

$sql = "SELECT user_name FROM users WHERE user_name = '$email'";
$stmt = $pdo->prepare($sql);
$stmt = $pdo->query($sql);
$controlEmail = $stmt->fetch();
$rowCount = $stmt->rowCount();

if($rowCount > 0) // napravi kveri kaj kategorija knigi avtori za da ne ti se povtoruvat
{
    foreach($controlEmail as $key=>$value)
    {
       $controlMail = strval($value);
        if(strcmp($controlMail, $email) == 0)
        {
            $_SESSION['error'] = "There is user with that email in our database. Try with another.";
            header("Location:../frontEnd/index.php");
            die();
        }
    }
}

$password_hash = password_hash($pass, PASSWORD_BCRYPT);

$sql = "INSERT INTO users(user_name, passkey) VALUES(:user_name, :passkey)";
$stmt = $pdo->prepare($sql);
if($stmt->execute([
    'user_name' => $_POST['email'],  
    'passkey' => password_hash($_POST['pass'], PASSWORD_BCRYPT)
]))
{  
    echo json_encode(['success'=>1]);
}
else
{
    echo json_encode(['success'=> 0]);
}