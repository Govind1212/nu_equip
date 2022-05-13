<?php 
require_once('../database/Database.php');
require_once('../interface/iUser.php');


class User extends Database implements iUser {
	public function __construct()
	{
		parent:: __construct();
	
	}

	public function my_session_start()
	{
		if(session_status() == PHP_SESSION_NONE)
		{
			session_start();//start session if session not start
		}
	}

	public function insert_user($fN, $mN, $lN, $pos, $dep, $type)
	{
		$un = $fN.'_'.$lN;
		$pass = $fN.'_'.$lN; $pass = md5($pass);
		$fN = ucwords($fN);
		$mN = ucwords($mN);
		$lN = ucwords($lN);
		$sql = "INSERT INTO tbl_user
				(usr_fname, usr_mname, usr_lname, pos_id, dep_id, type_id, usr_un, usr_pass)
				VALUES(?, ?, ?, ?, ?, ?, ?, ?);
				";
		return $this->insertRow($sql, [$fN, $mN, $lN, $pos, $dep, $type, $un, $pass]);
	}

	public function update_user($fN, $mN, $lN, $pos, $dep, $type, $eid)
	{
		$sql = "UPDATE tbl_user
				SET usr_fname = ?, usr_mname = ?, usr_lname = ?, pos_id = ?, dep_id = ?, type_id = ?
				WHERE usr_id = ?;
		";
		return $this->updateRow($sql, [$fN, $mN, $lN, $pos, $dep, $type, $eid]);
	}

	public function get_user($usr_id)
	{
		$sql = "SELECT * 
					FROM tbl_user e
					INNER JOIN tbl_pos p
					ON e.pos_id = p.pos_id
					INNER JOIN tbl_dep o 
					ON e.dep_id = o.dep_id 
					INNER JOIN tbl_usr_type t 
					ON e.type_id = t.type_id
					WHERE e.usr_id = ?
					ORDER BY e.usr_fname;
			";
		return $this->getRow($sql, [$usr_id]);
	}

	public function get_users($inner_joined = false)
	{
		$still_work_here = true;
		if(!$inner_joined){
			$sql = "SELECT * 
					FROM tbl_user
					WHERE usr_at_nuemgt = ?
					ORDER BY usr_fname;
			";
			return $this->getRows($sql, [$still_work_here]);
		}else{
			//get all including FK
			$sql = "SELECT * 
					FROM tbl_user e
					INNER JOIN tbl_pos p
					ON e.pos_id = p.pos_id
					INNER JOIN tbl_dep o 
					ON e.dep_id = o.dep_id 
					INNER JOIN tbl_usr_type t 
					ON e.type_id = t.type_id
					WHERE e.usr_at_nuemgt = ?
					ORDER BY e.usr_fname;
			";
			return $this->getRows($sql, [$still_work_here]);
		}
	}
		
	public function user_positions()
	{
		$sql = "SELECT * FROM tbl_pos;";
		return $this->getRows($sql);
	}

	public function user_departments()
	{
		$sql = "SELECT * FROM tbl_dep;";
		return $this->getRows($sql);
	}

	public function user_account_types()
	{
		$sql = "SELECT * FROM tbl_usr_type;";
		return $this->getRows($sql);
	}

	public function user_remove_undo($at_nuemgt, $eid)
	{	
		$sql = "UPDATE tbl_user 
				SET usr_at_nuemgt = ?
				WHERE usr_id = ?;
		";
		return $this->updateRow($sql, [$at_nuemgt, $eid]);
	}

	public function insert_user_position($position)
	{
		$sql = "INSERT INTO tbl_pos(pos_desc)
				VALUES(?);
		";
		return $this->insertRow($sql, [$position]);
	}

	public function insert_user_department($department)
	{
		$sql="INSERT INTO tbl_dep(dep_desc)
			  VALUES(?);
			";
		return $this->insertRow($sql, [$department]);
	}

	public function change_user_password($id, $un, $pwd)
	{
		$sql = "UPDATE tbl_user
				SET usr_un = ?, usr_pass = ?
				WHERE usr_id = ?;
		";
		return $this->updateRow($sql, [$un, $pwd, $id]);
	}

	public function item_issued()
	{
		/*
		*this function select all the user login owned items 
		* 3 or Condemed
		*/
		$condition = 1;
		$status = 4;//must = to none then then display.. if not display sa request nga TAB sa dashboard
		$this->my_session_start();
		$uid = $_SESSION['user_logged_in'];
		$sql = "SELECT *
				FROM tbl_item i
				INNER JOIN tbl_cat c 
				ON i.cat_id = c.cat_id 
				INNER JOIN tbl_con co 
				ON i.con_id = co.con_id
				INNER JOIN tbl_item_status s
				ON i.status_id = s.status_id
				WHERE i.usr_id = ?
				AND i.con_id = ?
				AND i.status_id = ?
		";
		$result = $this->getRows($sql, [$uid, $condition, $status]);
		return $result;
	}

	public function update_admin_data($un, $pass)
	{
		//id of admin naa sa session
		$this->my_session_start();
		$id = $_SESSION['admin_logged_in'];
		$pass = md5($pass);
		$sql = "UPDATE tbl_user
				SET usr_un = ?, usr_pass = ?
				WHERE usr_id = ?;
			";
		return $this->insertRow($sql, [$un, $pass, $id]);
	}//end update_admin
}

$user = new User();

/* End of file user.php */
/* Location: .//D/xampp/htdocs/nu_emgt/class/User.php */
 ?>