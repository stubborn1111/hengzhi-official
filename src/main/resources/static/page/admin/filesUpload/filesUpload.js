function add() {
	layui.use('layer', function() {
		var $ = layui.jquery;
		var element = layui.element;
		var layer = layui.layer;
		var form = layui.form;
		layer.open({
			type: 1,
			title: '发布公告',
			area: ['350px', '250px'],
			shade: 0.4,
			content: $("#testgg"),
			btn: ['发布', '取消'],
			scrollbar: false,
			yes: function(index) {
				var content = $("#mess").val()
				console.log(content)
				if (content.match(/^\s*$/)) {
					layer.msg("你好像什么都没有输入耶")
				} else {
					var authorization = localStorage.getItem("authorization");
					var userId1 = document.getElementsByClassName("headImgg")[0]
					var userId = userId1.dataset.id
					data = {
						content: content,
						userId: userId
					}
					$.ajax({
						type: 'post',
						url: 'http://123.56.29.67/hengzhi-official/show/addNotice',
						dataType: 'json',
						contentType: 'application/json;charset=utf-8',
						headers: {
							'Authorization': authorization
						},
						data: JSON.stringify(data),
						success: function(data) {
							if (data.msg == "success") {
								layer.msg("成功发布")
								layer.close(index);
							} else {
								layer.msg("发布失败")
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

// 展示公告
$(document).ready(function() {
	var authorization = localStorage.getItem("authorization");
	// 个人信息
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
			<img class="headImgg" data-id="${data.userId}" src="http://123.56.29.67/hengzhi-official/headImage/newFileName${data.headImg}">
			`
			msg1.innerHTML = str1;
		},
		error: function() {}
	});
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/show/showNotice',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		headers: {
			'Authorization': authorization
		},
		// data: JSON.stringify(data),
		success: function(data) {
			var msg1 = document.getElementById("notice")
			var str1 = ""
			var jsonLength = 0;
			for (var i in data) {
				jsonLength++;
			}
			for (var i = 0; i < jsonLength; i++) {
				str1 += `
				<li class="layui-timeline-item">
					<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
					<div class="layui-timeline-content layui-text">
						<h3 class="layui-timeline-title">${data[i].time}</h3>
						<div class="contents">
							${data[i].content}
						</div>
						<div class="aa">—— ${data[i].userName}</div>
					</div>
				</li>
				`
			}
			msg1.innerHTML = str1;
		},
		error: function() {}
	});
})
