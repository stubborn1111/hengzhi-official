// 显示工作室简介
$(document).ready(function() {
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/show/showIntroduction',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		success: function(data) {
			var msg1 = document.getElementsByClassName("all")[0]
			var msg2 = document.getElementsByClassName("all")[1]
			var msg3 = document.getElementsByClassName("all")[2]
			var str1 = ""
			var str2 = ""
			var str3 = ""
			str1 = `
			<textarea name="desc" class="layui-textarea" id="aa1" placeholder="${data.teamIntroduction}"></textarea>
			`
			str2 = `
			<textarea name="desc" class="layui-textarea" id="aa2" placeholder="${data.front}"></textarea>
			`
			str3 = `
			<textarea name="desc" class="layui-textarea" id="aa3" placeholder="${data.behind}"></textarea>
			`
			msg1.innerHTML = str1;
			msg2.innerHTML = str2;
			msg3.innerHTML = str3;
		},
		error: function() {}
	});
})
// 修改工作室简介
function add() {
	var msg1 = $("#aa1").val()
	var msg2 = $("#aa2").val()
	var msg3 = $("#aa3").val()
	// var msg4 = msg1.val()
	// var msg5 = msg2.val()
	// var msg6 = msg3.val()
	if (msg1.match(/^\s*$/) || msg2.match(/^\s*$/) || msg3.match(/^\s*$/)) {
		layer.msg("请输入完整")
	} else {
		var authorization = localStorage.getItem("authorization");
		var formData = new FormData();
		formData.append("teamIntroduction", msg1);
		formData.append("front", msg2);
		formData.append("behind", msg3);
		// data = {
		// 	teamIntroduction: msg1,
		// 	front: msg2,
		// 	behind: msg3
		// }
		$.ajax({
			type: 'post',
			url: 'http://123.56.29.67/hengzhi-official/show/updateIntroduction',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			headers: {
				'Authorization': authorization
			},
			processData: false,
			contentType: false,
			data: formData,
			success: function(data) {
				if (data.msg == "success") {
					layer.msg("修改成功")
				} else {
					layer.msg("修改失败")
				}
			},
			error: function() {}
		});
	}

}
