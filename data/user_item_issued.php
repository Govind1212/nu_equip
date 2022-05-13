<?php 
require_once('../class/User.php');

$item_issued = $user->item_issued();

// echo '<pre>';
// 	print_r($item_issued);
// echo '</pre>';

?>

<table id="myTable-item-issued" class="table table-bordered table-hover" cellspacing="0" width="100%">
	<thead>
	    <tr>
	        <th>Item Name</th>
	        <th>Brand</th>
	        <th>Category</th>
	        <th><center>Request</center></th>
	    </tr>
	</thead>
    <tbody>
		<?php 
			foreach ($item_issued as $issued) {
				$iID = $issued['item_id'];
				$name = $issued['item_name'];
				$brand = $issued['item_brand'];
				$cat = $issued['cat_desc'];
				$status = $issued['status_desc'];
				$stat_id = $issued['status_id'];
		?>
			<tr>
				<td><?php echo $name; ?></td>
				<td><?php echo $brand; ?></td>
				<td><?php echo $cat; ?></td>
				<td align="center">
					
					<button type="button" class="btn btn-info btn-sm" onclick="request('<?php echo $iID; ?>', '1');">
					<span class="glyphicon glyphicon-wrench" aria-hidden="true"></span>
					Repair</button>

					<button type="button" class="btn btn-warning btn-sm" onclick="request('<?php echo $iID; ?>', '2');">
					<span class="glyphicon glyphicon-transfer" aria-hidden="true"></span>
					Transfer</button>

					<button type="button" class="btn btn-danger btn-sm" onclick="request('<?php echo $iID; ?>', '3');">
					<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
					Condemed</button>
					
				</td>
			</tr>
		<?php
			}//end foreach
		 ?>
    </tbody>
</table>


<?php 
$user->Disconnect();
 ?>

<!-- for the datatable of user -->
<script type="text/javascript">
	$(document).ready(function() {
		$('#myTable-item-issued').DataTable();
	});
</script>