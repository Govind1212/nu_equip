<?php 
require_once('../database/Database.php');
require_once('../interface/iDepartment.php');
class Department extends Database implements iDepartment{
	
	public function get_departments()
	{
		$sql = "SELECT * FROM tbl_dep";
		
		return $this->getRows($sql);
	}
	public function update_department($id,$dep)
	{
		$sql = "UPDATE tbl_dep 
				SET dep_desc = ?
				WHERE dep_id = ?;
		";
		return $this->updateRow($sql, [$dep, $id]);
	}

	public function delete_department($oid)
	{
		$sql = "DELETE FROM `tbl_dep` WHERE dep_id = ?";
		return $this->deleteRow($sql, [$oid]);
	}
}

$department = new Department();