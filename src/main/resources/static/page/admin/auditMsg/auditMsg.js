$(document).ready(function() {
	var authorization = localStorage.getItem("authorization");
	data = {
		page : 1,
		size : 5
	}
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/generalManager/unExam',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(data),
		headers: {
			'Authorization': authorization
		},
		success: function(data) {
			console.log(data)
		},
		error: function() {}
	})
})

