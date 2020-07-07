let amenities = {}
$(document).ready(function() {
	showPlaces();
	$("input:checkbox").change(function() {
		if ($(this).is(":checked")) {
			amenities[$(this).data("id")] = $(this).data("name");
		} else {
			delete amenities[$(this).data("id")];
		}
		$("div.amenities h4").html(function() {
			let list_amenities = [];
			for (let key in amenities) {
				list_amenities.push(amenities[key]);
			};
			if (amenities.length === 0) {
				return ('&nbsp');
			}
			return (list_amenities.join(", "));
		});
	});
});

let urll = 'http://0.0.0.0:5001/api/v1/status';
$.get(urll, function (data) {
	if (data.status === 'OK') {
		$('div#api_status').addClass('available');
	}
});

function showPlaces() {
	$('section.places').html('');
	let url = 'http://0.0.0.0:5001/api/v1/places_search/';
	$.ajax({
		url: url,
		type: "POST",
		data: '{}',
		contentType: 'application/json',
		success: function(data) {
			data.forEach(function(place) {
				let divC = "</div>";
			// setting title box
			let divO = '<div class="title_box">';
			let name = "<h2>" + place.name + "<h2>";
			let price = '<div class="price_by_night">' + place.price_by_night + divC;
			let topbox_final = divO + name + price + divC;


			// setting information
			divO = '<div class="information">';
			let text = "";
			if (place.max_guest != 1) {
				text = " Guests";
			} else {
				text = " Guest";
			}
			let max_guest = '<div class="max_guest">' + place.max_guest + text + '</div>';
			if (place.number_rooms != 1) {
				text = " Rooms";
			} else {
				text = " Room";
			}
			let number_rooms = '<div class="number_rooms">' + place.number_rooms + text + '</div>';
			if (place.number_bathrooms != 1) {
				text = " Bathrooms";
			} else {
				text = " Bathroom";
			}
			let number_bathrooms = '<div class="number_bathrooms">' + place.number_bathrooms + text + '</div>';
			
			let information_final = divO + max_guest + number_rooms + number_bathrooms + divC;

			// setting description
			divO = '<div class="description">';
			let description_final = divO + place.description + divC;

			// final merge
			let article = '<article>' + topbox_final + information_final + description_final + '</article>';
			$('section.places').append(article);
		});
		}
	});
}