<?php 
require_once('../class/User.php');
$user->my_session_start();
$eid = $_SESSION['user_logged_in'];
// $eid = $eid['usr_id'];
$result = $user->get_user($eid);
echo json_encode($result);

$user->Disconnect();