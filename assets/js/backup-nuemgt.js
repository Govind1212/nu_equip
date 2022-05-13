
var valid = true;
var action = '';


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
		if(form_data[i].val() == ''){
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
				alert('Error: validate:12345');
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



/*kung e lick ang table nga row sa item table*/
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
		if(form_data[i].val() == ''){
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
		if(form_data[i].val() == ''){
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

//user remove or undo 
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
				usr_at_nuemgt	: usr_at_nuemgt,
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
/* end edit user*/