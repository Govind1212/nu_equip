<?php 
require_once('../class/Department.php');
if(isset($_POST['data'])){
	$data = json_decode($_POST['data'], true);
	$pid = $data[0];
	$desc = $data[1];

	$res = $department->update_department($pid, $desc);
	if($res == 1){
		$result['valid'] = true;
		$result['msg'] = 'Department Updated Successfully!';
		echo json_encode($result);
	}
}

$department->Disconnect();