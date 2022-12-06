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
$password = $_POST['pass'];

if(empty($email) || empty($password))
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
if(!preg_match($pattern, $password))
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

if($rowCount == 1)
{
    foreach($controlEmail as $key=>$value)
    {
        $controlMail = strval($value);
        if(strcmp($controlMail, $email) !== 0)
        {
            $_SESSION['error'] = "There isn't user with that email in our database. Try again.";
            header("Location:../frontEnd/index.php");
            die();
        }
    }
}


$sql = "SELECT passkey FROM users WHERE user_name = '$email'";
$stmt = $pdo->query($sql);
$controlPasskey = $stmt->fetch();
$rowCount = $stmt->rowCount();

if($rowCount == 1)
{
    foreach($controlPasskey as $key=>$value)
    {
       if(password_verify($password, $value))
       {
            $sql = "SELECT `role` FROM users WHERE user_name = '$email'";
            $stmt = $pdo->query($sql);
            $controlRole = $stmt->fetch();
            foreach($controlRole as $key=>$value)
            {
                $sql = "SELECT id FROM users WHERE user_name = '$email'";
                $stmt = $pdo->query($sql);
                $id = $stmt->fetch();
    
                if($value == 0)
                {
                    $_SESSION['user'] = $controlEmail['user_name'];
                    echo json_encode(['id'=>$id,'success'=>0]);
                }
                else
                {
                    $_SESSION['admin'] = $controlEmail['user_name'];
                    echo json_encode(['id'=>$id,'success'=>1]);
                }
            }  
       }
       else
       {
           $_SESSION['error'] = "You've entered wrong password. Try again.";
           header("Location:../frontEnd/index.php");
           die(); 
       }
    }
}