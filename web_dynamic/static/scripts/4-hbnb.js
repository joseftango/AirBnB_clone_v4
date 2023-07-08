$(document).ready(function () {
	// look for places_search
	let dict = {};
	$.ajax({
	  type: 'POST',
	  url: 'http://0.0.0.0:5001/api/v1/places_search/',
	  data: JSON.stringify(dict),
	  success: function (result) {
		for (let i in result) {
		  let places_content = [
			'<article>',
			'<div class="title_box">',
			'<h2>' + result[i].name + '</h2>',
			'<div class="price_by_night">' + '$' + result[i].price_by_night + '</div>',
			'</div>',
			'<div class="information">',
			'<div class="max_guest">' + result[i].max_guest + ' Guests' + '</div>',
				'<div class="number_rooms">' + result[i].number_rooms + ' Bedrooms' + '</div>',
				'<div class="number_bathrooms">' + result[i].number_bathrooms + ' Bathrooms' + '</div>',
			'</div>',
			'<div class="description">',
			result[i].description,
			'</div>',
			'</article>'
		  ];
		  $(places_content.join('')).appendTo('section.places');
		}
	  },
	  dataType: 'json',
	  contentType: 'application/json'
	});
  
	// look for api_status
	$.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
	  if (data['status'] === 'OK') {
		$('DIV#api_status').addClass('available');
	  } else {
		$('DIV#api_status').removeClass('available');
	  }
	});
  
	  let my_dict = {};
  
	  $('input[type=checkbox]').click(function () {
  
		  if ($(this).is(':checked')) {
			  my_dict[$(this).data('id')] = $(this).data('name');
			  $('.amenities h4').text(Object.values(my_dict).join(', '));
		  } else if ($(this).not(':checked')) {
			  delete my_dict[$(this).data('id')];
			  $('.amenities h4').text(Object.values(my_dict).join(', '));
			  if (Object.getOwnPropertyNames(my_dict).length === 0)
				  $('.amenities h4').html("&nbsp;");
		  }
	  });
  
  
  
	$("button").click(function(){
	  const amenitiesIds = {
		amenities: Object.keys(my_dict)
	  };
	  $('section.places').empty();
	  $.ajax({
		type: 'POST',
		url: 'http://0.0.0.0:5001/api/v1/places_search/',
		data: JSON.stringify(amenitiesIds),
		success: function (result) {
		  for (let i in result) {
			let places_content = [
			  '<article>',
			  '<div class="title_box">',
			  '<h2>' + result[i].name + '</h2>',
			  '<div class="price_by_night">' + '$' + result[i].price_by_night + '</div>',
			  '</div>',
			  '<div class="information">',
			  '<div class="max_guest">' + result[i].max_guest + ' Guests' + '</div>',
			  '<div class="number_rooms">' + result[i].number_rooms + ' Bedrooms' + '</div>',
			  '<div class="number_bathrooms">' + result[i].number_bathrooms + ' Bathrooms' + '</div>',
			  '</div>',
			  '<div class="description">',
			  result[i].description,
			  '</div>',
			  '</article>'
			];
			$(places_content.join('')).appendTo('section.places');
		  }
		},
		dataType: 'json',
		contentType: 'application/json'
	  });
	});
  });
