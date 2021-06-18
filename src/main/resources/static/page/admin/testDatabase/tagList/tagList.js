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
			for(var i = 0 ; i<data.length ; i++){
				str +=`
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
							if(data.msg=="success"){
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
										for(var i = 0 ; i<data.length ; i++){
											str +=`
											<button type="button" class="tag lauui-btn">${data[i]}</button>
											`
										}
										var msg = document.getElementsByClassName("tagList")[0]
										msg.innerHTML = str;
									},
									error: function() {}
								});
							}
							else if(data.msg=="该tag已存在"){
								layer.msg("该标签已存在")
							}
							else{
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
