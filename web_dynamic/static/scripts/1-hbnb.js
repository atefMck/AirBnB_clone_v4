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
