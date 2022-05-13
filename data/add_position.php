<?php 
require_once('../class/User.php');

if(isset($_POST['pos'])){
	$pos = $_POST['pos'];
	$return['valid'] = $user->insert_user_position($pos);
	if($return['valid']){
		//if true and no error in query
		$return['msg'] = "New Position Added Successfully!";
		echo json_encode($return);
	}//end if
}

$user->Disconnect();