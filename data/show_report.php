<?php 
require_once('../class/Item.php');
if(isset($_POST['choice'])){
	$choice = $_POST['choice'];

	$reports = $item->item_report($choice);
	// echo '<pre>';
	// 	print_r($reports);
	// echo '</pre>';

?>

<br />
<br />
<table id="myTable-report" class="table table-bordered table-hover" cellspacing="0" width="100%">
	<thead>
	    <tr>
	        <th>Item Name</th>
	        <th>Issuer</th>
	        <th>Location</th>
	        <th>Category</th>
	        <th>Condition</th>
	    </tr>
	</thead>
    <tbody>
    	<?php foreach($reports as $r): 
    		$fN = $r['usr_fname'];
    		$mN = $r['usr_mname'];
    		$lN = $r['usr_lname'];
    		$mN = $mN[0];
    		$fullName = "$fN $mN. $lN";
    		$fullName = ucwords($fullName);
    	?>
    		<tr>
    			<td><?= $r['item_name']; ?></td>
    			<td><?= $fullName; ?></td>
    			<td><?= $r['dep_desc']; ?></td>
    			<td><?= $r['cat_desc']; ?></td>
    			<td><?= $r['con_desc']; ?></td>
    		</tr>
    	<?php endforeach; ?>
    </tbody>
</table>


<?php 
// $db->Disconnect();
 ?>

<!-- for the datatable of user -->
<script type="text/javascript">
	$(document).ready(function() {
		$('#myTable-report').DataTable();
	});
</script>



<?php

	// echo $choice;
}//end isset

