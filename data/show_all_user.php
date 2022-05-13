<?php 
require_once('../class/User.php'); 
$users = $user->get_users(true);
// echo '<pre>';
// 	print_r($users);
// echo '</pre>';
?>

<br />
<table id="myTable-user" class="table table-bordered table-hover" cellspacing="0" width="100%">
	<thead>
	    <tr>
	        <th>User Name</th>
	        <th>Position</th>
	        <th>Location</th>
	        <th><center>Action</center></th>
	    </tr>
	</thead>
    <tbody>
		<?php 
			foreach ($users as $usr) {
				$mN = $usr['usr_mname'];
				$mN = $mN[0].'.';
				$fullName = $usr['usr_fname'].' '.$mN.' '.$usr['usr_lname'];
				$pos = $usr['pos_desc'];
				$dep = $usr['dep_desc'];
				$work_here = $usr['usr_at_nuemgt'];
				$usr_id = $usr['usr_id'];
		?>
			<tr>
				<td <?php echo $work_here ? 'class="text-success"':'class="text-danger"'; ?> 
					onclick="user_profile('<?php echo $usr_id; ?>');"><?php echo $fullName; ?>
				</td>

				<td <?php echo $work_here ? 'class="text-success"':'class="text-danger"'; ?> 
					onclick="user_profile('<?php echo $usr_id; ?>');"><?php echo $pos; ?>
				</td>
				
				<td <?php echo $work_here ? 'class="text-success"':'class="text-danger"'; ?> 
					onclick="user_profile('<?php echo $usr_id; ?>');"><?php echo $dep; ?>
				</td>

				<td align="center" width="180px">
							<button type="button" onclick="edit_user_fill('<?php echo $usr_id; ?>');" class="btn btn-warning btn-xs" <?php echo $work_here ? '':'disabled'; ?> >
							<span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
							Edit</button>
					<?php 

						if(!$work_here){
					?>
							<!-- <button type="button" class="btn btn-success btn-xs" onclick="user_remove_undo('undo','<?php echo $usr_id; ?>')">
							<span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
							Undo&nbsp;</button> -->
					<?php
						}else{
					?>
							<button type="button" class="btn btn-danger btn-xs" onclick="user_remove_undo('remove','<?php echo $usr_id; ?>')">
							<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
							Delete</button>
					<?php		
						}//end if else of $work_here
					 ?>
					
				</td>
			</tr>
		<?php
			}//end foreach users
		 ?>
    </tbody>
</table>


<?php 
// $db->Disconnect();
 ?>

<!-- for the datatable of user -->
<script type="text/javascript">
	$(document).ready(function() {
		$('#myTable-user').DataTable();
	});
</script>
