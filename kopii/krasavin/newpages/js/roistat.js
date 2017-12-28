$('form').submit(function(){

	//form-text + form-text-lowers
	//form-panel-text
	//p

	var form_name = $(this).find('[name="roistat-form-name"]').val();
	form_name = form_name ? form_name : $(this).find('[type="submit"]').attr('value');

	var fields = {};

	$(this).find('input').each(function(){

		fields[$(this).attr('name')] = $(this).val();

	});

	roistatGoal.reach({
		leadName: form_name, 
		name: fields['name'], 
		phone: fields['phone'], 
		// email: email, 
		text: '', 
		fields: {
		    //936138: roistatMarker
		}
	});

	//alert('Спасибо');

});