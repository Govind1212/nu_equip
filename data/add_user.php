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

	$result['valid'] = $user->insert_user($fN, $mN, $lN, $pos, $dep, $type);
	if($result['valid']){
		$result['msg'] = 'New User Added Successfully!';
		echo json_encode($result);
	}//end
	// echo 'debug';
}


$user->Disconnect();
 ?>

