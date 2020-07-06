let url = 'http://0.0.0.0:5001/api/v1/status';
$.get(url, function (data, status) {
	if (data.status === 'OK') {
		console.log("khdem")
		$('div#api_status').addClass('available');
	}
});

let amenities = {}
$(document).ready(function() {
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
