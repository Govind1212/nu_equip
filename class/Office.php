<?php 
require_once('../database/Database.php');
require_once('../interface/iOffice.php');
class Office extends Database implements iOffice{
	
	public function get_offices()
	{
		$sql = "SELECT * FROM tbl_off";
		
		return $this->getRows($sql);
	}
	public function update_office($id,$off)
	{
		$sql = "UPDATE tbl_off 
				SET off_desc = ?
				WHERE off_id = ?;
		";
		return $this->updateRow($sql, [$off, $id]);
	}

	public function delete_office($oid)
	{
		$sql = "DELETE FROM `tbl_off` WHERE off_id = ?";
		return $this->deleteRow($sql, [$oid]);
	}
}

$office = new Office();