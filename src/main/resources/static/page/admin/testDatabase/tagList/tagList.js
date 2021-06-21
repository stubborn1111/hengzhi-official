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
// 显示所有tag
$(document).ready(function() {
	var authorization = localStorage.getItem("authorization");
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/makePaper/findAllTag',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		headers: {
			'Authorization': authorization
		},
		success: function(data) {
			var str = ""
			for (var i = 0; i < data.length; i++) {
				str += `
				<button type="button" class="tag lauui-btn">${data[i]}</button>
				`
			}
			var msg = document.getElementsByClassName("tagList")[0]
			msg.innerHTML = str;
		},
		error: function() {}
	});
})
// 添加tag
function add() {
	layui.use('layer', function() {
		var $ = layui.jquery;
		var element = layui.element;
		var layer = layui.layer;
		var form = layui.form;
		layer.open({
			type: 1,
			title: '添加标签',
			area: ['350px', '200px'],
			shade: 0.4,
			content: $("#testbq"),
			btn: ['添加', '取消'],
			scrollbar: false,
			yes: function(index) {
				var tagName = $("#tagName").val()
				if (tagName.match(/^\s*$/)) {
					layer.msg("你好像什么都没有输入耶")
				} else {
					var authorization = localStorage.getItem("authorization");
					data = {
						kind: tagName,
					}
					$.ajax({
						type: 'post',
						url: 'http://123.56.29.67/hengzhi-official/makePaper/addTag',
						dataType: 'json',
						contentType: 'application/json;charset=utf-8',
						headers: {
							'Authorization': authorization
						},
						data: JSON.stringify(data),
						success: function(data) {
							if (data.msg == "success") {
								layer.close(index)
								layer.msg("添加成功")
								$.ajax({
									type: 'post',
									url: 'http://123.56.29.67/hengzhi-official/makePaper/findAllTag',
									dataType: 'json',
									contentType: 'application/json;charset=utf-8',
									headers: {
										'Authorization': authorization
									},
									success: function(data) {
										var str = ""
										for (var i = 0; i < data
											.length; i++) {
											str += `
											<button type="button" class="tag lauui-btn">${data[i]}</button>
											`
										}
										var msg = document
											.getElementsByClassName(
												"tagList")[0]
										msg.innerHTML = str;
									},
									error: function() {}
								});
							} else if (data.msg == "该tag已存在") {
								layer.msg("该标签已存在")
							} else {
								layer.msg("添加失败")
							}
						},
						error: function() {}
					});

				}


			},
			btn2: function() {}
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
								window.location.href =
										window.location.href = "../../../login/login.html";
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
	layer.msg("成功退出登录")
	setTimeout(function() {
		window.location.href = "../../../login/login.html";
	}, 2000);
}
