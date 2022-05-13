<?php 
interface iUser{
	public function my_session_start();
	public function insert_user($fN, $mN, $lN, $pos, $dep, $type);
	public function update_user($fN, $mN, $lN, $pos, $dep, $type, $eid);
	public function get_user($usr_id);
	public function get_users($inner_joined = false);
	public function user_positions();
	public function user_departments();
	public function user_account_types();
	public function user_remove_undo($at_nuemgt, $eid);
	public function insert_user_position($position);
	public function insert_user_department($department);
	public function change_user_password($id, $un, $pwd);
	public function item_issued();
	public function update_admin_data($un, $pass);

}

