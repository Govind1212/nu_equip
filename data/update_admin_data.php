<?php 
require_once('../class/User.php');
if(isset($_POST['data'])){
	// echo 'yey';
	$data = json_decode($_POST['data'], true);
	$un = $data[0];
	$pass = $data[1];
	// print_r($data);
	$results = $user->update_admin_data($un, $pass);
	if($results == 1){
		$result['valid'] = true;
		$result['msg'] = 'Account Updated Successfully!';
	}else{
		$result['valid'] = false;
	}
	echo json_encode($result);
}

$user->Disconnect();