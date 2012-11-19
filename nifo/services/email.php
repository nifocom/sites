<?php
$time = (int)time() - (int)$_COOKIE['nifoSendMail'];
if($_COOKIE['nifoSendMail'] && $time < 60){
    echo json_encode(array("result" => $time));
    die();
    
}
setcookie("nifoSendMail", time(), time() + 600);
require_once('phpmailer/class.phpmailer.php');
require_once('phpmailer/sendmail.php');

$subject = "Nifo: ".$_POST['Category'];
$message .= "Name: ".$_POST['Name'].";";
$message .= "Phone: ".$_POST['Phone'].";";
$message .= "Email: ".$_POST['Email'].";";
$message .= "Text: ".$_POST['Message'].".";
$result = smtpmailer('tim@nifo.com', 'nifo.dev@gmail.com', 'nifo', $subject, $message);

if($result)
    echo json_encode(array("result" => $time));
else
    echo json_encode(array("result" => $time));
?>
