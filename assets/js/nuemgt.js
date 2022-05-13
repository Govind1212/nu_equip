
var valid = true;
var action = '';



//fill the changepassword form
$(document).ready(function() {
	$.ajax({
			url: '../data/get_admin_data.php',
			type: 'post',
			dataType: 'json',
			success: function (data) {
				if(data.valid == valid){
					// console.log(data);
					$('#admin-account').append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span> '+
								data.logged+
								'<span class="caret"></span>');
					$('#change-username').val(data.logged_un);
				}else{
					alert('Account is Invalid!');
				}
			},
			error: function(){
				alert('Error: L11+');
			}
		});
	
});
                       

$(document).on('submit', '#add-item-form', function(event) {
	event.preventDefault();
	/* Act on the event */
	var validate = '';
	var form_data = new Array(
								$('input[id=itemname]'),
								$('input[id=serialNumber]'),
								$('input[id=modelNumber]'),
								$('input[id=brand]'),
								$('input[id=amount]'),
								$('input[id=purDate]'),
								$('#usrID'),
								$('#catID'),
								$('#conID')
							);
	
	var data = new Array(form_data.length);

	for(var i = 0; i < form_data.length; i++){
		if(form_data[i].val().length == 0){
			form_data[i].parent().parent().addClass('has-error');
		}else{
			form_data[i].parent().parent().removeClass('has-error');
			data[i] = form_data[i].val();
			validate += i;
		}
	}

	if(validate == '012345678'){
		$.ajax({
			url: '../data/addItem.php',
			type: 'post',
			dataType: 'json',
			data: {
				data: JSON.stringify(data)
			},
			success: function(event){
				if(event.valid == valid){
					$('#modal-add-item').modal('hide');
					$('#add-item-form').trigger('reset');
					$('#modal-message-box').modal('show');
					$('#modal-message-box').find('.modal-body').text(event.msg);
					action = event.action;
					show_all_item();
				}
			},
			error: function(){
				alert('Error: L57+ add item');
			}
		});//end ajax
	}//end validate
});//submit #add-item-form

//display all item
function show_all_item()
{
	$.ajax({
		url: '../data/show_all_item.php',
		type: 'post',
		async: false,
		success: function(event){
			$('#allItem').html(event);
		},
		error: function(){
			alert('Error: show all item L100+');
		}
	});

	
}

show_all_item();



function item_profile(iID)
{
	$('#modal-item-profile').modal('show');
	$.ajax({
		url: '../data/item_profile.php',
		dataType: 'json',
		type: 'post',
		data: {
			iID: iID
		},
		success: function(event){
			// console.log(event);
			$('.item-name').val(event.item_name);
			$('.item-brand').val(event.item_brand);
			$('.item-serial').val(event.item_serno);
			$('.item-model').val(event.item_modno);
			$('.item-amount').val(Number(event.item_amount).toLocaleString('en'));
			$('.item-purchased').val(event.item_purdate);
			$('.item-issuer').val(event.usr_fname+' '+event.usr_mname+' '+event.usr_lname);
			$('.item-category').val(event.cat_desc);
			$('.item-condition').val(event.con_desc);
		},
		error: function(){
			alert('Error: item_profile L136+');
		}
	});
}//end function item_profile

/*
*e fill ang update modal
*/
function fill_update_modal(iID){
	$.ajax({
			url: '../data/item_profile.php',
			type: 'post',
			dataType: 'json',
			data: { iID: iID},
			success: function (data) {
				$('#itemName-update').val(data.item_name);
				$('#serialNumber-update').val(data.item_serno);
				$('#modelNumber-update').val(data.item_modno);
				$('#brand-update').val(data.item_brand);
				$('#amount-update').val(data.item_amount);
				$('#purDate-update').val(data.item_purdate);
				$('#usrID-update').val(data.usr_id);
				$('#catID-update').val(data.cat_id);
				$('#conID-update').val(data.con_id);

				$('#iID').val(data.item_id)//iID

				$('#modal-update-item').modal('show');
			},
			error: function (){
				alert('Error: fill_update_modal L172+');
			}
		});

}

$(document).on('submit', '#update-item-form', function(event) {
	event.preventDefault();
	/* Act on the event */
	var validate = '';
	var form_data = new Array(
								$('input[id=itemName-update]'), 
								$('input[id=serialNumber-update]'), 
								$('input[id=modelNumber-update]'), 
								$('input[id=brand-update]'), 
								$('input[id=amount-update]'), 
								$('input[id=purDate-update]'),
								$('#usrID-update'),
								$('#catID-update'),
								$('#conID-update'),
								$('#iID')
							);

	var data = new Array(form_data.length);
	for(var i = 0; i < form_data.length; i++){
		if(form_data[i].val().length == 0){
			form_data[i].parent().parent().addClass('has-error');
		}else{
			form_data[i].parent().parent().removeClass('has-error');
			data[i] = form_data[i].val();
			validate += i;
		}
	}


	if(validate == '0123456789'){
		$.ajax({
				url: '../data/update_item.php',
				type: 'post',
				dataType: 'json',
				data: {
					data: JSON.stringify(data)
				},
				success: function (data) {
					if(data.valid == valid){
						$('#modal-update-item').modal('hide');
						$('#modal-message-box').find('.modal-body').text(data.msg);
						$('#modal-message-box').modal('show');
						show_all_item();
					}
				},
				error: function (){
					alert('Error: update item L250+');
				}
			});
	}//end valdidate
});//end submit $update-item-form

/*
*user logic begin here
*/
//clear inputs of add user if update used it
// for reusable used of modal we need this line of code to
//clean the inputs after update
$('#add-user-menu').click(function(event) {
	/* Act on the event */
	$('#add-user-form').trigger('reset');
});
$(document).on('submit', '#add-user-form', function(event) {
	event.preventDefault();
	/* Act on the event */
	var validate = '';
	var form_data = new Array(
								$('input[id=fN]'), 
								$('input[id=mN]'), 
								$('input[id=lN]'),
								$('#position'),
								$('#department'),
								$('#type')
							);
	var data = new Array(form_data.length);

	for(var i = 0; i < form_data.length; i++){
		if(form_data[i].val().length == 0){
			form_data[i].parent().parent().addClass('has-error');
		}else{
			form_data[i].parent().parent().removeClass('has-error');
			data[i] = form_data[i].val();
			validate += i;
		}
	}

	if(validate == '012345'){
		$.ajax({
				url: '../data/add_user.php',
				type: 'post',
				dataType: 'json',
				data: { data: JSON.stringify(data) },
				success: function (response) {
					if(response.valid == valid){
						$('#modal-add-user').modal('hide');
						$('#modal-message-box').find('.modal-body').text(response.msg);
						$('#modal-message-box').modal('show');
						$('#add-user-form').trigger('reset');
						 // window.location="../admin/user.php";
						show_all_user();

					}
				},
				error: function (){
					alert('Error: L235+');
				}
			});
	}
	

});


/*
*show all user function
*and display on the table
*/
function show_all_user()
{
	$.ajax({
			url: '../data/show_all_user.php',
			type: 'post',
			async: false,
			success: function (data) {
				$('#all_user').html(data);
			},
			error: function (){
				alert('Error: L266+ show_all_user');
			}
		});
}//end show_all_user
show_all_user();

//usser remove or undo 
var remove_undo_choice;
var eid;//user id
function user_remove_undo(choice, id){
	$('#modal-user-remove-undo').modal('show');
	remove_undo_choice = choice;
	eid = id;
}

$('#remove_undo').click(function(event) {
	//this event trigered when confirmed button is clicked
	var usr_at_nuemgt;
	if(remove_undo_choice == 'remove'){
		// usr_at_nuemgt = false;
		usr_at_nuemgt = 0;
	}else{
		// usr_at_nuemgt = true;
		usr_at_nuemgt = 1;
	}
	$.ajax({
			url: '../data/user_remove_undo.php',
			type: 'post',
			dataType: 'json',
			data: {
				usr_at_nuemgt	: usr_at_,
				eid 			: eid
			},
			success: function (data) {
				// console.log(data);
				$('#modal-user-remove-undo').modal('hide');
				show_all_user();
			},
			error: function(){
				alert('Error: L294+ #remove_undo');
			}
		});
});
//end user remove or undo 

/*add position logic*/
$(document).on('submit', '#add-position-form', function(event) {
	event.preventDefault();
	/* Act on the event */
	var pos = $('input[id=position]');
 	if(pos.val() == ''){
 		pos.parent().parent().addClass('has-error');
 	}else{
 		pos.parent().parent().removeClass('has-error');
 		$.ajax({
 				url: '../data/add_position.php',
 				type: 'post',
 				dataType: 'json',
 				data: { 
 					pos: pos.val()
 				},
 				success: function (data) {
 					if(data.valid = valid){
 						$('#modal-add-position').modal('hide');
 						$('#modal-message-box').find('.modal-body').text(data.msg);
 						$('#modal-message-box').modal('show');
 						$('#add-position-form').trigger('reset');
						get_positions();
 					}//end if
 				},
 				error: function(){
 					alert('Error: L328+ submit #add-position-form');
 				}
 			});
 	}



});	
/*end add position logic*/

/*add new department logic here*/
$(document).on('submit', '#add-department-form', function(event) {
	event.preventDefault();
	/* Act on the event */
	var department = $('input[id=department]');
	if(department.val() == ''){
		department.parent().parent().addClass('has-error');
	}else{
		department.parent().parent().removeClass('has-error');
		$.ajax({
				url: '../data/add_department.php',
				type: 'post',
				dataType: 'json',
				data: {
					dep : department.val()
				},
				success: function (data) {
					if(data.valid == valid){
						$('#modal-add-department').modal('hide');
						$('#modal-message-box').find('.modal-body').text(data.msg);
 						$('#modal-message-box').modal('show');
 						$('#add-position-form').trigger('reset');
 						get_departments();
					}
				},
				error: function(){
					alert('Error: L366+ on submit #add-department-form');
				}
			});
	}
});
/*end add new department logic here*/


/*view user 1 by 1*/
function user_profile(eid){
	var at_nuemgt;
	$('#modal-user-profile').modal('show');
	$.ajax({
			url: '../data/user_profile.php',
			type: 'post',
			dataType: 'json',
			data: {
				eid : eid
			},
			success: function (data) {
				console.log(data);
				if(data){
					$('.fN').val(data.usr_fname);
					$('.mN').val(data.usr_mname);
					$('.lN').val(data.usr_lname);
					$('.position').val(data.pos_desc);
					$('.department').val(data.dep_desc);
					$('.type').val(data.type_desc);
					at_nuemgt = data.usr_at_nuemgt == 1 ? 'YES':'NO';
					$('.wh').val(at_nuemgt);
				}
			},
			error: function(){
				alert('Error: L389+ user_profile');
			}
		});
}
/*end view user 1 by 1*/

/*edit user*/
function edit_user_fill(eid){
	$('#modal-update-user').modal('show');
	$('#modal-update-user').find('.modal-title').text('Update User');

	//get user data using ajax and fill the modal 
	$.ajax({
			url: '../data/user_profile.php',
			type: 'post',
			dataType: 'json',
			data: {
				eid : eid
			},
			success: function (data) {
				if(data){
					$('#update-fN').val(data.usr_fname);
					$('#update-mN').val(data.usr_mname);
					$('#update-lN').val(data.usr_lname);
					$('#update-position').val(data.pos_id);
					$('#update-department').val(data.dep_id);
					$('#update-type').val(data.type_id);

					$('#update-eid').val(eid);

				}
			},
			error: function(){
				alert('Error: L434+ update user');
			}
		});
}

$(document).on('submit', '#update-user-form', function(event) {
	event.preventDefault();
	/* Act on the event */
	var validate = '';
	var form_data = new Array(
									$('#update-fN'),	
									$('#update-mN'),	
									$('#update-lN'),	
									$('#update-position'),	
									$('#update-department'),	
									$('#update-type'),
									$('#update-eid')
								);

	var data = new Array(form_data.length);
	for(var i = 0; i < form_data.length; i++){
		if(form_data[i].val() == 0){
			form_data[i].parent().parent().addClass('has-error');
		}else{
			form_data[i].parent().parent().removeClass('has-error');
			data[i] = form_data[i].val();
			validate += i;
		}
	}


	if(validate == "0123456"){
		$.ajax({
				url: '../data/update_user.php',
				type: 'post',
				dataType: 'json',
				data: {
					data : JSON.stringify(data)
				},
				success: function (data) {
					if(data.valid == valid){
						$('#modal-update-user').modal('hide');
						show_all_user();
						$('#"modal-message-box').find('.modal-body').text(data.msg);
					}
				},
				error: function(){
					alert('Error: L485+ update_user');
				}
			});
	}

});
/* end edit user*/


//all request to admin
function all_request_to_admin()
{
	$.ajax({
			url: '../data/all_request_to_admin.php',
			type: 'post',
			success: function (data) {
				// console.log(data);
				$('#request-to-admin').html(data);
			},
			error: function(){
				alert('Error: L510+ all req to admin');
			}
		});
}
all_request_to_admin();

//request_action
var action = '';
var request_id = '';
var item_id = '';
var req_type = '';

function request_action(action_choice, rid, iid, r_type){
	action = action_choice;
	request_id = rid;
	item_id = iid;
	req_type = r_type;
	$('#modal-request-action').modal('show');
}

$('#confirm-action').click(function(event) {
	/* Act on the event */
	$.ajax({
			url: '../data/admin_request_action.php',
			type: 'post',
			// dataType: 'json',
			data: {
				action : action,
				req_id : request_id,
				item_id : item_id,
				req_type : req_type
			},
			success: function (data) {
				console.log(data);
				$('#modal-request-action').modal('hide');
				all_request_to_admin();	
			},
			error: function(){
				alert('Error: L537+');
			}
		});
});
//end all request to admin


//changepass logic
$(document).on('submit', '#form-changepassword', function(event) {
	event.preventDefault();
	/* Act on the event */
	var validate = '';
	var form_att = new Array(
							$('input[id=change-username]'),
							$('input[id=change-password]'),
							$('input[id=confirm-password]')
						);
	var data = new Array(form_att.length);
	for(var i = 0; i < data.length; i ++){
		if(form_att[i].val() == 0){
			form_att[i].parent().parent().addClass('has-error');
		}else{
			form_att[i].parent().parent().removeClass('has-error');
			validate += i;
			data[i] = form_att[i].val();
		}
	}//end for
	//check if pass match
	if(validate == '012'){
		if($('input[id=change-password]').val() == $('input[id=confirm-password]').val()){
			// console.log('equal');
			$.ajax({
					url: '../data/update_admin_data.php',
					type: 'post',
					dataType: 'json',
					data: {
						data: JSON.stringify(data)
					},
					success: function (data) {
						// console.log(data);
						if(data.valid == valid){
							//if success
							$('#modal-changepass').modal('hide');
							$('#modal-message-box').modal('show');
							$('#modal-message-box').find('.modal-body').text(data.msg);
						}else{
							alert('Opps: Somethings went wrong! check db!');
						}
					},
					error: function(){
						alert('Error: L612+');
					}
				});
		}else{
			// console.log('not equal');
			alert('Password Not Matched!');
		}
	}
});

//get all positions available and put in the table
function get_positions() {
	$.ajax({
			url: '../data/get_all_positions.php',
			type: 'post',
			success: function (data) {
				$('#positions').html(data);
			},
			error: function(){
				alert('Error: L643+');
			}
		});
}//end get_positions
get_positions();

//get position id to be deleted or update
var pos_id;
function get_pos_id(pid, choice){
	pos_id = pid;
	if(choice == 'del'){
		$('#modal-position').modal('show');
	}
}//end get_pos_id

var dep_id;
function get_dep_id(pid, choice){
	dep_id = pid;
	if(choice == 'del'){
		$('#modal-department').modal('show');
	}
}//end get_pos_id
$('#confirm-position').click(function(event) {
	/* Act on the event */
	$.ajax({
			url: '../data/delete_position.php',
			type: 'post',
			dataType: 'json',
			data: {
				pid : pos_id
			},
			success: function (data) {
				if(data.valid == valid){
					$('#modal-position').modal('hide');
					$('#modal-message-box').modal('show');
					$('#modal-message-box').find('.modal-body').text(data.msg);
					get_positions();
				}
			},
			error: function(){
				alert('Error: L671+');
			}
		});
});
$('#confirm-department').click(function(event) {
	/* Act on the event */
	$.ajax({
			url: '../data/delete_department.php',
			type: 'post',
			dataType: 'json',
			data: {
				dep_id : dep_id
			},
			success: function (data) {
				if(data.valid == valid){
					$('#modal-department').modal('hide');
					$('#modal-message-box').modal('show');
					$('#modal-message-box').find('.modal-body').text(data.msg);
					get_departments();
				}
			},
			error: function(){
				alert('Error: L671+');
			}
		});
});

//fill position 
function fill_position(id){
	$.ajax({
			url: '../data/fill_position.php',
			type: 'post',
			dataType: 'json',
			data: {
				pid : id
			},
			success: function (data) {
				if(data.valid == valid){
					$('#upt-pos-id').val(data.pid);
					$('#upt-position').val(data.desc);
					$('#modal-upt-position').modal('show');
					// console.log(data);
				}
			},
			error: function(){
				alert('Error: L691+');
			}
		});
}
//end fill position 

//update position
$(document).on('submit', '#upt-position-form', function(event) {
	event.preventDefault();
	/* Act on the event */
	var validate = "";
	var form_att = new Array(
				$('input[id=upt-pos-id]'),
				$('input[id=upt-position]')
		);
	var form_data = new Array(form_att.length);
	for(var i = 0; i < form_data.length; i++){
		if(form_att[i].val() == 0){
			form_att[i].parent().parent().addClass('has-error');
		}else{
			form_att[i].parent().parent().removeClass('has-error');
			validate += i;
			form_data[i] = form_att[i].val();
		}
	}//end for
	if(validate == "01"){
		$.ajax({
				url: '../data/update_position.php',
				type: 'post',
				dataType: 'json',
				data: {
					data : JSON.stringify(form_data)
				},
				success: function (data) {
					if(data.valid = valid){
						$('#modal-upt-position').modal('hide');
						get_positions();
						$('#modal-message-box').modal('show');
						$('#modal-message-box').find('.modal-body').text(data.msg);
					}
				},
				error: function(){
					alert('Error: L734+');
				}
			});
	}

});
//end update position
$(document).on('submit', '#upt-department-form', function(event) {
	event.preventDefault();
	/* Act on the event */
	var validate = "";
	var form_att = new Array(
				$('input[id=dep-id]'),
				$('input[id=upt-department]')
		);
	var form_data = new Array(form_att.length);
	for(var i = 0; i < form_data.length; i++){
		if(form_att[i].val() == 0){
			form_att[i].parent().parent().addClass('has-error');
		}else{
			form_att[i].parent().parent().removeClass('has-error');
			validate += i;
			form_data[i] = form_att[i].val();
		}
	}//end for
	if(validate == "01"){
		$.ajax({
				url: '../data/update_department.php',
				type: 'post',
				dataType: 'json',
				data: {
					data : JSON.stringify(form_data)
				},
				success: function (data) {
					if(data.valid = valid){
						$('#modal-update-department').modal('hide');
						get_departments();
						$('#modal-message-box').modal('show');
						$('#modal-message-box').find('.modal-body').text(data.msg);
					}
				},
				error: function(){
					alert('Error: L734+');
				}
			});
	}

});
//end update position

//get departments
function get_departments()
{
	$.ajax({
			url: '../data/get_departments.php',
			type: 'post',
			success: function (data) {
				$('#departments').html(data);
			},
			error: function(){
				alert('Error: L760+');
			}
		});
}
get_departments();
//end get department

var dep_id;
function fill_department_form(id,department){
	dep_id = id;
	$('#dep-id').val(dep_id)
	$('#upt-department').val(department)
	$('#modal-update-department').modal('show');
}

// $(document).on('submit', '#modal-update-department', function(event) {
// 	event.preventDefault();
// 	/* Act on the event */
// 	alert('bogkot');

// });

// alert('test');

//on change ang select nga cat
$(document).on('change', '#catID', function(event) {
	event.preventDefault();
	/* Act on the event */
	// $('#serialNumber').attr('type', 'hidden');
	var cat = $('#catID').val();
	if(cat == 2){
		$('#sr').hide();
		$('#mn').hide();
		$('#b').hide();
		//put spaces value 
		$('#serialNumber').val(' ');
		$('#modelNumber').val(' ');
		$('#brand').val(' ');
	}else{
		$('#sr').show();
		$('#mn').show();
		$('#b').show();		
	}

});


$('#addItem').click(function(event) {
	/* Act on the event */
	$('#sr').show();
		$('#mn').show();
		$('#b').show();	

		$('#catID').val('1');
});

$(document).on('change', '#report-choice', function(event) {
	event.preventDefault();
	/* Act on the event */
	var choice = $('#report-choice').val();
	$.ajax({
			url: '../data/show_report.php',
			type: 'post',
			data: {
				choice: choice
			},
			success: function (data) {
				$('#show-report').html(data);
			},
			error: function(){
				alert('Error: L825+');
			}
		});
});

function show_report(){
	$.ajax({
			url: '../data/show_report.php',
			type: 'post',
			data: {
				choice: 'all'
			},
			success: function (data) {
				$('#show-report').html(data);
			},
			error: function(){
				alert('Error: L825+');
			}
		});
}//end function show_report
show_report();

$('#print-btn').click(function(event) {
	/* Act on the event */
	var choice = $('#report-choice').val();
	window.open('../data/print.php?choice='+choice,'name','width=600,height=400');
});
