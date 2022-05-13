<?php 
require_once('../class/User.php');
if(isset($_POST['dep'])){
	$dep = $_POST['dep'];

	$result['valid'] = $user->insert_user_department($dep);
	if($result['valid']){
		$result['msg'] = 'New Department Added Successfully!';
		echo json_encode($result);
	}
}

$user->Disconnect();