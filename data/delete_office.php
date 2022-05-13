<?php 
require_once('../class/Office.php');

if(isset($_POST['off_id'])){
	$off_id = $_POST['off_id'];
	$del_off = $office->delete_office($off_id);
	if($del_off == 1){
		$result['valid'] = true;
		$result['msg'] = 'Office Deleted Successfully!';
		echo json_encode($result);
	}
}

$office->Disconnect();