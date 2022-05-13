<?php 
require_once('../class/User.php');

if(isset($_POST['eid'])){
	$eid = $_POST['eid'];

	$result = $user->get_user($eid);
	if($result){
		echo json_encode($result);
	}
}

$user->Disconnect();