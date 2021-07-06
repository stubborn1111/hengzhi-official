$(document).ready(function() {
	var authorization = localStorage.getItem("authorization");
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/super/getRPNumber',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		headers: {
			'Authorization': authorization
		},
		success: function(res) {
			var number = res.rpNumber
			$.ajax({
				type: 'post',
				url: 'http://123.56.29.67/hengzhi-official/user/getUserInfo',
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				headers: {
					'Authorization': authorization
				},
				// data: JSON.stringify(data),
				success: function(data) {
					var msg1 = document.getElementById("head")
					var str1 = ""
					str1 = `
				<img class="headImgg" data-id="${data.userId}" src="http://123.56.29.67/hengzhi-official/headImage/${data.headImg}">
				<span class="layui-badge huizhang" title="您有${number}条密码修改申请未审核">${number}</span>
			`
					msg1.innerHTML = str1;
				},
				error: function() {}
			});
		},
		error: function() {}
	});

})
	// 修改头像
function change1() {
	layui.use('layer', function() {
		var $ = layui.jquery;
		var element = layui.element;
		var layer = layui.layer;
		var form = layui.form;
		layer.open({
			type: 1,
			title: '修改头像',
			area: ['350px', '250px'],
			shade: 0.4,
			content: $("#test2"),
			btn: ['提交', '取消'],
			scrollbar: false,
			yes: function(index) {
				// function postData() {
					var authorization = localStorage.getItem("authorization");
					console.log(authorization);
					var formData = new FormData();
					formData.append("headImage", $("#uploadImage")[0].files[0]);
					$.ajax({
							url: "http://123.56.29.67/hengzhi-official/user/updateHeadImg",
							type: "post",
							data: formData,
							headers: {
								'Authorization': authorization
							},
							processData: false, // 告诉jQuery不要去处理发送的数据
							contentType: false, // 告诉jQuery不要去设置Content-Type请求头
							dataType: 'text',
							success: function(data) {
								console.log(data)

									var params = JSON.parse(data)
									$("#img").attr("src", params);
									layer.close(index);
									layer.msg("修改成功")
									setTimeout(function() {
										window.location.href = "../staffInfo/staffInfo.html";
									}, 1000);
							},
							error: function(data) {
									
							}
					});
				// }
			},
			btn2: function() {
				// layer.msg('bbb');
			}
		});
	});
}
	// 修改密码
	function change() {
		layui.use('layer', function() {
			var $ = layui.jquery;
			var element = layui.element;
			var layer = layui.layer;
			var form = layui.form;
			layer.open({
				type: 1,
				title: '修改密码',
				area: ['350px', '250px'],
				shade: 0.4,
				content: $("#test1"),
				btn: ['提交', '取消'],
				scrollbar: false,
				yes: function(index) {
					// var studentId = $("#studentId").val();
					var password = $("#password").val();
					var newPassword = $("#newPassword").val();
					var data = {
						// "studentId": studentId,
						"password": password,
						"newPassword": newPassword,
					};
					var authorization = localStorage.getItem("authorization");
					console.log(data)
					console.log(authorization)
					$.ajax({
						type: 'post',
						url: 'http://123.56.29.67/hengzhi-official/user/updatePassword',
						dataType: 'json',
						contentType: 'application/json;charset=utf-8',
						headers: {
							'Authorization': authorization
						},
						data: JSON.stringify(data),
						success: function(data) {
							if (data.status == "success") {
								layer.close(index);
								layer.msg("修改成功");
								localStorage.setItem("authorization", "");
								setTimeout(function() {
									window.location.href = "../../login/login.html";
								}, 2000);
							} else {
								layer.msg("修改失败")
							}
						},
						error: function() {}
					});
				},
				btn2: function() {
					// layer.msg('bbb');
				}
			});
		});
	}
	
	// 退出登录
	function logout() {
		localStorage.setItem("authorization", "");
		setTimeout(function() {
			window.location.href = "../../login/login.html";
		}, 2000);
	}
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
