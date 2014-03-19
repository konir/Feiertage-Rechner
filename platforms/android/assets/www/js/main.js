$(document).ready(function() {

	// input validation
	$('.jahrSlider')
			.keypress(
					function(event) {
						var keycode;

						keycode = event.keyCode ? event.keyCode : event.which;

						if (!(event.shiftKey == false && (keycode == 46 || keycode == 27
								|| keycode == 9 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
							event.preventDefault();
							alert("Bitte nur Zahlen eingeben!");
							return false;
						} else {
							return true;
						}
					});

	$( "#jahrSlider" ).on( 'slidestop', function( event ) { 
		var slider = $("#jahrSlider");
		value = parseInt(slider.val(), 10);
		calcFeiertage(value);
	});

	// increase year value
	$('#increase').on('tap', function(e) {

		var slider = $("#jahrSlider");

		value = parseInt(slider.val(), 10);
		console.log(value);
		slider.val(value + 1);
		slider.slider('refresh');
		calcFeiertage(slider.val());
	});

	// decrease year value
	$('#decrease').on('tap', function(e) {

		var slider = $("#jahrSlider");

		value = parseInt(slider.val(), 10);
		console.log(value);
		slider.val(value - 1);
		slider.slider('refresh');
		calcFeiertage(slider.val());

	});

	//$('#control div.ui-slider').insertBefore('#jahrSlider');

	
});

