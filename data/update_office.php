<?php 
require_once('../class/Office.php');
if(isset($_POST['data'])){
	$data = json_decode($_POST['data'], true);
	$pid = $data[0];
	$desc = $data[1];

	$res = $office->update_office($pid, $desc);
	if($res == 1){
		$result['valid'] = true;
		$result['msg'] = 'Office Updated Successfully!';
		echo json_encode($result);
	}
}

$office->Disconnect();