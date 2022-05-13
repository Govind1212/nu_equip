<?php 
require_once('../class/Department.php');

$res =  $department->get_departments();

// print_r($res);

?>


<table id="myTable-department" class="table table-bordered table-hover" cellspacing="0" width="100%">
	<thead>
	    <tr>
	        <td>Location</td>
	        <th><center>Action</center></th>
	    </tr>
	</thead>
 	<tbody>
 	<?php foreach($res as $r): ?>
 		<tr>
 			<td><?= $r['dep_desc']; ?></td>
 			<td>
 				<center>
 					<button type="button" class="btn btn-warning btn-xs" onclick="fill_department_form('<?= $r['dep_id'] ?>','<?= $r['dep_desc'] ?>');">
 					<span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Edit</button>
 					<button type="button" class="btn btn-danger btn-xs" onclick="get_dep_id('<?= $r['dep_id'] ?>','del');">
 					<span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</button>
 				</center>
 			</td>
 		</tr>
 	<?php endforeach; ?>
 	</tbody>
</table>


<?php 
$department->Disconnect();
 ?>

<!-- for the datatable of user -->
<script type="text/javascript">
	$(document).ready(function() {
		$('#myTable-department').DataTable();
	});
</script>




