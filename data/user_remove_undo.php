<?php 
require_once('../class/User.php');

if(isset($_POST['usr_at_nuemgt'])){
	$usr_at_nuemgt = $_POST['usr_at_nuemgt'];
	$eid = $_POST['eid'];

	// $result = $user->user_remove_undo($usr_at_nuemgt, $eid);
	
	$result['valid'] = $user->user_remove_undo($usr_at_nuemgt, $eid);
	if($result['valid']){
		$result['msg'] = 'success';
		echo json_encode($result);
	}


	// $result['msg'] = 'success';
	// echo json_encode($result);
	// echo $result;
}

$user->Disconnect();