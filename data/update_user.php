<?php 
require_once('../class/User.php');

if(isset($_POST['data'])){
	$data = json_decode($_POST['data'], true);
	$fN = $data[0];
	$mN = $data[1];
	$lN = $data[2];
	$pos = $data[3];
	$dep = $data[4];
	$type = $data[5];
	$eid = $data[6];

	$result['valid'] = $user->update_user($fN, $mN, $lN, $pos, $dep, $type, $eid);
	if($result['valid']){
		$result['msg'] = "User Updated Successfully!";
		echo json_encode($result);	
	}

}


$user->Disconnect();