<?php 
require_once('../class/Department.php');

if(isset($_POST['dep_id'])){
	$dep_id = $_POST['dep_id'];
	$del_dep = $department->delete_department($dep_id);
	if($del_dep == 1){
		$result['valid'] = true;
		$result['msg'] = 'Department Deleted Successfully!';
		echo json_encode($result);
	}
}

$department->Disconnect();