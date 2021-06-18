// 自动登录
// $(document).ready(function() {
// 	var au = localStorage.getItem("authorization")
// 	if (au == undefined || au == null || au == '') {} else {
// 		$.ajax({
// 			type: 'post',
// 			url: 'http://123.56.29.67/hengzhi-official/user/verify',
// 			dataType: 'json',
// 			contentType: 'application/json;charset=utf-8',
// 			headers: {
// 				'Authorization': au
// 			},
// 			success: function(data) {
// 				console.log(data)
// 				if (data.verify == "false") {} else {
// 					if (data.power == "user") {
// 						window.location.href = "../user/notice/notice.html";
// 					}
// 					if (data.power == "super") {
// 						window.location.href = "../superAdmin/staffInfo/staffInfo.html";
// 					}
// 					if (data.power == "admin") {
// 						window.location.href = "../admin/staffInfo/staffInfo.html";
// 					}
// 				}
// 			},
// 			error: function() {

// 			}
// 		});
// 	}


// })

function forget() {
	layui.use('layer', function() {
		var $ = layui.jquery;
		var element = layui.element;
		var layer = layui.layer;
		var form = layui.form;
		layer.open({
			type: 1,
			title: '忘记密码',
			area: ['350px', '250px'],
			shade: 0.4,
			content: $("#test"),
			btn: ['提交', '取消'],
			scrollbar: false,
			yes: function(index) {
				var studentId = $("#studentId1").val();
				var password = $("#password1").val();
				var data = {
					"studentId": studentId,
					"newPassword": password
				};
				console.log(data)
				// console.log(authorization)
				$.ajax({
					type: 'post',
					url: 'http://123.56.29.67/hengzhi-official/user/forgetPassword',
					dataType: 'json',
					contentType: 'application/json;charset=utf-8',
					// headers:{
					// 	'Authorization':authorization
					// },
					data: JSON.stringify(data),
					success: function(data) {},
					error: function() {}
				});
			},
			btn2: function() {}
		});
	});
}

function login() {
	var studentId = $("#studentId").val();
	var password = $("#password").val();
	var data = {
		"studentId": studentId,
		"password": password
	};

	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/user/login',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(data),
		success: function(data, statusTest, xhr) {
			// 获得指定的字段
			if (data.status == "success") {
				authorization = xhr.getResponseHeader("authorization");
				localStorage.setItem("authorization", authorization);
				if (data.power == "user") {
					window.location.href = "../user/notice/notice.html";
				}
				if (data.power == "super") {
					window.location.href = "../superAdmin/staffInfo/staffInfo.html";
				}
				if (data.power == "admin") {
					window.location.href = "../admin/staffInfo/staffInfo.html";
				}
			} else {
				layer.msg("登录失败")
			}
		},
		error: function() {}
	});
}
