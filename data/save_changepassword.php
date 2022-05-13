<?php 
require_once('../class/User.php');
if(isset($_POST['uid'])){
	$id = $_POST['uid'];
	$un = $_POST['un'];
	$pwd = $_POST['pwd'];

	$pwd = md5($pwd);

	$result['valid'] = $user->change_user_password($id, $un, $pwd);
	if($result['valid']){
		$result['msg'] = 'Password Change Successfully!';
		echo json_encode($result);
	}
}
$user->Disconnect();