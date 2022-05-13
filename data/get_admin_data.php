<?php 
require_once('../class/Login.php');

$admin = $login->admin_data();
// print_r($admin);

if($admin > 1){
	$result['valid'] = true;
	$result['logged'] = $admin['usr_fname'].' '.$admin['usr_lname'];
	$result['logged_un'] = $admin['usr_un'];
}else{
	$result['valid'] = false;
}
echo json_encode($result);