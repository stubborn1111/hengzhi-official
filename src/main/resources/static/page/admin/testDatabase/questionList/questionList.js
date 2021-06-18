// 添加题目
var list = []
function add() {
	layui.use('layer', function() {
		var $ = layui.jquery;
		var element = layui.element;
		var layer = layui.layer;
		var form = layui.form;
		layer.open({
			type: 1,
			title: '添加题目',
			area: ['500px', '400px'],
			shade: 0.4,
			content: $("#testtm"),
			btn: ['添加', '取消'],
			scrollbar: false,
			yes: function(index) {
				var ok = true
				var content = $("#ques").val()
				var answer = $("#answer").val()
				var description = $("#any").val()
				var contenta = content.match(/^\s*$/)
				var answera = answer.match(/^\s*$/)
				var descriptiona = description.match(/^\s*$/)
				if (list.length == 0) {
					ok = false
				} else {
					var kind = list[0].name
					for (var i = 1; i < list.length; i++) {
						kind += list[i].name + ","
					}
				}
				for (var i = 0; i < 4; i++) {
					var typea = document.getElementsByClassName("ah")[i].checked
					if (typea == true) {
						type = i
					}
				}
				var choices = []
				if (contenta || answera || descriptiona) {
					ok = false
				}
				if (type == 1) {
					for (var i = 0; i < 4; i++) {
						var choice = document.getElementsByClassName("choice")[i].value
						if (choice.match(/^\s*$/)) {} else {
							choices.push(choice)
						}
					}
					if (choices.length < 2) {
						ok = false
					} else {
						content += '<div class="">'
						for(var j =0 ;j<choices.length ;j++){
							content += '<div><input type="radio" name="" value="'+choices[j]+'" title="'+choices[j]+'"></div>'
						}
						content += '</div>'
						
					}
				}
				if (type == 2) {
					for (var i = 0; i < 4; i++) {
						var choice = document.getElementsByClassName("choice")[i].value
						if (choice.match(/^\s*$/)) {} else {
							choices.push(choice)
						}
					}
					if (choices.length < 3) {
						ok = false
					} else {
						content += '<div class="">'
						for(var j =0 ;j<choices.length ;j++){
							content += '<div><input type="checkbox" name="" value="'+choices[j]+'" title="'+choices[j]+'" lay-skin="primary"></div>'
						}
						content += '</div>'
					}
				}
				if (ok == true) {
					var authorization = localStorage.getItem("authorization");
					data = {
						content: content,
						answer: answer,
						description: description,
						kind: kind,
						type: type
					}
					$.ajax({
						type: 'post',
						url: 'http://123.56.29.67/hengzhi-official/makePaper/addQuestions',
						dataType: 'json',
						contentType: 'application/json;charset=utf-8',
						headers: {
							'Authorization': authorization
						},
						data: JSON.stringify(data),
						success: function(data) {
							if(data.msg=="success"){
								layer.msg("添加成功")
							}
							else{
								layer.msg("添加失败")
							}
						},
						error: function() {}
					});
				} else {
					layer.msg("请将题目信息填写完整")
				}

			},
			btn2: function() {
				layer.close(index)
			}
		});
	});
}

layui.use('form', function() {
	var form = layui.form;
	form.on('radio(aaa)', function(data) {
		console.log("你好")
		if ($('#IsPurchased input[name="qtype"]:checked ').val() == "单选题" || $(
				'#IsPurchased input[name="qtype"]:checked ').val() == "多选题") {
			$(".nishuo").show();
		} else {
			$(".nishuo").hide();
		}
		form.render();
	});
});


function findTag() {
	var authorization = localStorage.getItem("authorization");
	var kind = $("#findtap").val()
	data = {
		kind: kind
	}
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/makePaper/findTag',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		headers: {
			'Authorization': authorization
		},
		data: JSON.stringify(data),
		success: function(data) {
			var str = ""
			var jsonLength = 0;
			for (var i in data) {
				jsonLength++;
			}
			for (var j = 0; j < jsonLength; j++) {
				str += `
				<button onclick="select(this)" type="button" class="tag lauui-btn layui-btn-primary" data-id="${data[j].tagId}" data-name="${data[j].tagName}">${data[j].tagName}</button>
				`
			}
			var msg1 = document.getElementById("tagList")
			msg1.innerHTML = str
		},
		error: function() {}
	});
}

function select(e) {
	var save = true
	var str = ""
	for (var i = 0; i < list.length; i++) {
		if (e.dataset.id == list[i].id) {
			save = false
		}
	}
	if (save == true) {
		var lista = {
			"id": e.dataset.id,
			"name": e.dataset.name
		}
		list.push(lista)
	}
	for (var i = 0; i < list.length; i++) {
		str += `
		<button type="button" onclick="notag(this)" class="tag lauui-btn layui-btn-primary" data-id="${list[i].id}" data-name="${list[i].name}">${list[i].name}</button>
		`
	}
	var taplist = document.getElementById("tags")
	taplist.innerHTML = str
}
// 移除tag
function notag(e) {
	var save = true
	var str = ""
	for (var i = 0; i < list.length; i++) {
		if (e.dataset.id == list[i].id) {
			list.splice(i, 1);
			break;
		}
	}
	for (var i = 0; i < list.length; i++) {
		str += `
		<button type="button" onclick="notag(this)" class="tag lauui-btn layui-btn-primary" data-id="${list[i].id}" data-name="${list[i].name}">${list[i].name}</button>
		`
	}
	var taplist = document.getElementById("tags")
	taplist.innerHTML = str
}

$(document).ready(function() {
	var authorization = localStorage.getItem("authorization");
	var data = {
		page: 1,
		size: 5
	}
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/makePaper/showQuestions',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(data),
		headers: {
			'Authorization': authorization
		},
		success: function(data) {
			var box = ""
			for (var i = 0; i < data.list.length; i++) {
				if (data.list[i].qtype == 1) {
					var qtype = "单选"
					box += `
						<div class="queList">
							<div class="top">
								<div>
									<span>题号：${data.list[i].questionId}</span>
									<span>题型：${qtype}</span>
								</div>
								<div>
									<span>出题人：${data.list[i].userName}</span>
									<span>正确率：${data.list[i].crate}</span>
								</div>
							</div>
							<div class="mid">
								<form class="layui-form" action="">
									<div class="layui-form-item">
										${data.list[i].content}
									</div>
								</form>
								<div class="answer">
									<div class="ansA">
										<span class="anss">正确答案：</span><span class="qans">${data.list[i].answer}</span>
									</div>
									<div class="ansB">
										<span class="anss">答案解析：</span><span class="des">${data.list[i].description}</span>
									</div>
								</div>
							</div>
							<div class="botm">
								<span>标签：</span>${data.list[i].kind}
							</div>
						</div>
						`
				} else if (data.list[i].qtype == 2) {
					var qtype = "多选"
					box += `
						<div class="queList">
							<div class="top">
								<div>
									<span>题号：${data.list[i].questionId}</span>
									<span>题型：${qtype}</span>
								</div>
								<div>
									<span>出题人：${data.list[i].userName}</span>
									<span>正确率：${data.list[i].crate}</span>
								</div>
							</div>
							<div class="mid">
								<form class="layui-form" action="">
									<div class="layui-form-item">
										${data.list[i].content}
									</div>
								</form>
								<div class="answer">
									<div class="ansA">
										<span class="anss">正确答案：</span><span class="qans">${data.list[i].answer}</span>
									</div>
									<div class="ansB">
										<span class="anss">答案解析：</span><span class="des">${data.list[i].description}</span>
									</div>
								</div>
							</div>
							<div class="botm">
								<span>标签：</span>${data.list[i].kind}
							</div>
						</div>
						`
				} else {
					if (data.list[i].qtype == 0) {
						var qtype = "填空"
					}
					if (data.list[i].qtype == 3) {
						var qtype = "主观"
					}
					box += `
						<div class="queList">
							<div class="top">
								<div>
									<span>题号：${data.list[i].questionId}</span>
									<span>题型：${qtype}</span>
								</div>
								<div>
									<span>出题人：${data.list[i].userName}</span>
									<span>正确率：${data.list[i].crate}</span>
								</div>
							</div>
							<div class="mid">
								<form class="layui-form" action="">
									<div class="layui-form-item">
										<div class="ques">${data.list[i].content}</div>
									</div>
								</form>
								<div class="answer">
									<div class="ansA">
										<span class="anss">正确答案：</span><span class="qans">${data.list[i].answer}</span>
									</div>
									<div class="ansB">
										<span class="anss">答案解析：</span><span class="des">${data.list[i].description}</span>
									</div>
								</div>
							</div>
							<div class="botm">
								<span>标签：</span>${data.list[i].kind}
							</div>
						</div>
						`
				}
			}
			var str = `
			<div class="fenye1">
				<div class="zuiqian" onclick="firstPage()">
					<i class="fa fa-angle-double-left"></i>
				</div>
				<div class="qian" onclick="prePage()">
					<i class="fa fa-angle-left"></i>
				</div>
				<div class="tiaozhuan">
					<input type="" name="" id="shuruyeshu1" value="" />
				</div>
				<div class="tiaozhuan1" onclick="jump()">
					跳转
				</div>
				<div class="zongyeshu" data-total="${data.pagesSize}">
					共${data.pagesSize}页
				</div>
				<div class="dangqianye" data-cur="${data.page}">
					第${data.page}页
				</div>
				<div class="hou" onclick="nextPage()">
					<i class="fa fa-angle-right"></i>
				</div>
				<div class="zuihou" onclick="lastPage()">
					<i class="fa fa-angle-double-right"></i>
				</div>
				<div class="clear">
				</div>
			</div>
			`
			var fenye = document.getElementsByClassName("fenye")[0]
			fenye.innerHTML = str;
			var divs = document.getElementsByClassName("queListBox")[0]
			divs.innerHTML = box;
		},
		error: function() {}
	});
})

function firstPage() {
	var authorization = localStorage.getItem("authorization");
	var data = {
		page: 1,
		size: 5
	}
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/makePaper/showQuestions',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(data),
		headers: {
			'Authorization': authorization
		},
		success: function(data) {
			var box = ""
			for (var i = 0; i < data.list.length; i++) {
				if (data.list[i].qtype == 1) {
					var qtype = "单选"
					box += `
						<div class="queList">
							<div class="top">
								<div>
									<span>题号：${data.list[i].questionId}</span>
									<span>题型：${qtype}</span>
								</div>
								<div>
									<span>出题人：${data.list[i].userName}</span>
									<span>正确率：${data.list[i].crate}</span>
								</div>
							</div>
							<div class="mid">
								<form class="layui-form" action="">
									<div class="layui-form-item">
										${data.list[i].content}
									</div>
								</form>
								<div class="answer">
									<div class="ansA">
										<span class="anss">正确答案：</span><span class="qans">${data.list[i].answer}</span>
									</div>
									<div class="ansB">
										<span class="anss">答案解析：</span><span class="des">${data.list[i].description}</span>
									</div>
								</div>
							</div>
							<div class="botm">
								<span>标签：</span>${data.list[i].kind}
							</div>
						</div>
						`
				} else if (data.list[i].qtype == 2) {
					var qtype = "多选"
					box += `
						<div class="queList">
							<div class="top">
								<div>
									<span>题号：${data.list[i].questionId}</span>
									<span>题型：${qtype}</span>
								</div>
								<div>
									<span>出题人：${data.list[i].userName}</span>
									<span>正确率：${data.list[i].crate}</span>
								</div>
							</div>
							<div class="mid">
								<form class="layui-form" action="">
									<div class="layui-form-item">
										${data.list[i].content}
									</div>
								</form>
								<div class="answer">
									<div class="ansA">
										<span class="anss">正确答案：</span><span class="qans">${data.list[i].answer}</span>
									</div>
									<div class="ansB">
										<span class="anss">答案解析：</span><span class="des">${data.list[i].description}</span>
									</div>
								</div>
							</div>
							<div class="botm">
								<span>标签：</span>${data.list[i].kind}
							</div>
						</div>
						`
				} else {
					if (data.list[i].qtype == 0) {
						var qtype = "填空"
					}
					if (data.list[i].qtype == 3) {
						var qtype = "主观"
					}
					box += `
						<div class="queList">
							<div class="top">
								<div>
									<span>题号：${data.list[i].questionId}</span>
									<span>题型：${qtype}</span>
								</div>
								<div>
									<span>出题人：${data.list[i].userName}</span>
									<span>正确率：${data.list[i].crate}</span>
								</div>
							</div>
							<div class="mid">
								<form class="layui-form" action="">
									<div class="layui-form-item">
										<div class="ques">${data.list[i].content}</div>
									</div>
								</form>
								<div class="answer">
									<div class="ansA">
										<span class="anss">正确答案：</span><span class="qans">${data.list[i].answer}</span>
									</div>
									<div class="ansB">
										<span class="anss">答案解析：</span><span class="des">${data.list[i].description}</span>
									</div>
								</div>
							</div>
							<div class="botm">
								<span>标签：</span>${data.list[i].kind}
							</div>
						</div>
						`
				}
			}
			var str = `
			<div class="fenye1">
				<div class="zuiqian" onclick="firstPage()">
					<i class="fa fa-angle-double-left"></i>
				</div>
				<div class="qian" onclick="prePage()">
					<i class="fa fa-angle-left"></i>
				</div>
				<div class="tiaozhuan">
					<input type="" name="" id="shuruyeshu1" value="" />
				</div>
				<div class="tiaozhuan1" onclick="jump()">
					跳转
				</div>
				<div class="zongyeshu" data-total="${data.pagesSize}">
					共${data.pagesSize}页
				</div>
				<div class="dangqianye" data-cur="${data.page}">
					第${data.page}页
				</div>
				<div class="hou" onclick="nextPage()">
					<i class="fa fa-angle-right"></i>
				</div>
				<div class="zuihou" onclick="lastPage()">
					<i class="fa fa-angle-double-right"></i>
				</div>
				<div class="clear">
				</div>
			</div>
			`
			var fenye = document.getElementsByClassName("fenye")[0]
			fenye.innerHTML = str;
			var divs = document.getElementsByClassName("queListBox")[0]
			divs.innerHTML = box;
		},
		error: function() {}
	});
}

function prePage() {
	var authorization = localStorage.getItem("authorization");
	// 总页数
	var total = document.getElementsByClassName("zongyeshu")[0]
	var total1 = total.dataset.total
	// 当前页码
	var cur = document.getElementsByClassName("dangqianye")[0]
	var cur1 = cur.dataset.cur
	if (cur1 >= 2) {
		var page = parseInt(cur1) - 1
		var data = {
			page: page,
			size: 5
		}
		$.ajax({
			type: 'post',
			url: 'http://123.56.29.67/hengzhi-official/makePaper/showQuestions',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			data: JSON.stringify(data),
			headers: {
				'Authorization': authorization
			},
			success: function(data) {
				var box = ""
				for (var i = 0; i < data.list.length; i++) {
					if (data.list[i].qtype == 1) {
						var qtype = "单选"
						box += `
							<div class="queList">
								<div class="top">
									<div>
										<span>题号：${data.list[i].questionId}</span>
										<span>题型：${qtype}</span>
									</div>
									<div>
										<span>出题人：${data.list[i].userName}</span>
										<span>正确率：${data.list[i].crate}</span>
									</div>
								</div>
								<div class="mid">
									<form class="layui-form" action="">
										<div class="layui-form-item">
											${data.list[i].content}
										</div>
									</form>
									<div class="answer">
										<div class="ansA">
											<span class="anss">正确答案：</span><span class="qans">${data.list[i].answer}</span>
										</div>
										<div class="ansB">
											<span class="anss">答案解析：</span><span class="des">${data.list[i].description}</span>
										</div>
									</div>
								</div>
								<div class="botm">
									<span>标签：</span>${data.list[i].kind}
								</div>
							</div>
							`
					} else if (data.list[i].qtype == 2) {
						var qtype = "多选"
						box += `
							<div class="queList">
								<div class="top">
									<div>
										<span>题号：${data.list[i].questionId}</span>
										<span>题型：${qtype}</span>
									</div>
									<div>
										<span>出题人：${data.list[i].userName}</span>
										<span>正确率：${data.list[i].crate}</span>
									</div>
								</div>
								<div class="mid">
									<form class="layui-form" action="">
										<div class="layui-form-item">
											${data.list[i].content}
										</div>
									</form>
									<div class="answer">
										<div class="ansA">
											<span class="anss">正确答案：</span><span class="qans">${data.list[i].answer}</span>
										</div>
										<div class="ansB">
											<span class="anss">答案解析：</span><span class="des">${data.list[i].description}</span>
										</div>
									</div>
								</div>
								<div class="botm">
									<span>标签：</span>${data.list[i].kind}
								</div>
							</div>
							`
					} else {
						if (data.list[i].qtype == 0) {
							var qtype = "填空"
						}
						if (data.list[i].qtype == 3) {
							var qtype = "主观"
						}
						box += `
							<div class="queList">
								<div class="top">
									<div>
										<span>题号：${data.list[i].questionId}</span>
										<span>题型：${qtype}</span>
									</div>
									<div>
										<span>出题人：${data.list[i].userName}</span>
										<span>正确率：${data.list[i].crate}</span>
									</div>
								</div>
								<div class="mid">
									<form class="layui-form" action="">
										<div class="layui-form-item">
											<div class="ques">${data.list[i].content}</div>
										</div>
									</form>
									<div class="answer">
										<div class="ansA">
											<span class="anss">正确答案：</span><span class="qans">${data.list[i].answer}</span>
										</div>
										<div class="ansB">
											<span class="anss">答案解析：</span><span class="des">${data.list[i].description}</span>
										</div>
									</div>
								</div>
								<div class="botm">
									<span>标签：</span>${data.list[i].kind}
								</div>
							</div>
							`
					}
				}
				var str = `
				<div class="fenye1">
					<div class="zuiqian" onclick="firstPage()">
						<i class="fa fa-angle-double-left"></i>
					</div>
					<div class="qian" onclick="prePage()">
						<i class="fa fa-angle-left"></i>
					</div>
					<div class="tiaozhuan">
						<input type="" name="" id="shuruyeshu1" value="" />
					</div>
					<div class="tiaozhuan1" onclick="jump()">
						跳转
					</div>
					<div class="zongyeshu" data-total="${data.pagesSize}">
						共${data.pagesSize}页
					</div>
					<div class="dangqianye" data-cur="${data.page}">
						第${data.page}页
					</div>
					<div class="hou" onclick="nextPage()">
						<i class="fa fa-angle-right"></i>
					</div>
					<div class="zuihou" onclick="lastPage()">
						<i class="fa fa-angle-double-right"></i>
					</div>
					<div class="clear">
					</div>
				</div>
				`
				var fenye = document.getElementsByClassName("fenye")[0]
				fenye.innerHTML = str;
				var divs = document.getElementsByClassName("queListBox")[0]
				divs.innerHTML = box;
			},
			error: function() {}
		});
	}

}

function nextPage() {
	var authorization = localStorage.getItem("authorization");
	// 总页数
	var total = document.getElementsByClassName("zongyeshu")[0]
	var total1 = total.dataset.total
	// 当前页码
	var cur = document.getElementsByClassName("dangqianye")[0]
	var cur1 = cur.dataset.cur
	if (cur1 < total1) {
		var page = parseInt(cur1) + 1
		var data = {
			page: page,
			size: 5
		}
		$.ajax({
			type: 'post',
			url: 'http://123.56.29.67/hengzhi-official/makePaper/showQuestions',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			data: JSON.stringify(data),
			headers: {
				'Authorization': authorization
			},
			success: function(data) {
				var box = ""
				for (var i = 0; i < data.list.length; i++) {
					if (data.list[i].qtype == 1) {
						var qtype = "单选"
						box += `
							<div class="queList">
								<div class="top">
									<div>
										<span>题号：${data.list[i].questionId}</span>
										<span>题型：${qtype}</span>
									</div>
									<div>
										<span>出题人：${data.list[i].userName}</span>
										<span>正确率：${data.list[i].crate}</span>
									</div>
								</div>
								<div class="mid">
									<form class="layui-form" action="">
										<div class="layui-form-item">
											${data.list[i].content}
										</div>
									</form>
									<div class="answer">
										<div class="ansA">
											<span class="anss">正确答案：</span><span class="qans">${data.list[i].answer}</span>
										</div>
										<div class="ansB">
											<span class="anss">答案解析：</span><span class="des">${data.list[i].description}</span>
										</div>
									</div>
								</div>
								<div class="botm">
									<span>标签：</span>${data.list[i].kind}
								</div>
							</div>
							`
					} else if (data.list[i].qtype == 2) {
						var qtype = "多选"
						box += `
							<div class="queList">
								<div class="top">
									<div>
										<span>题号：${data.list[i].questionId}</span>
										<span>题型：${qtype}</span>
									</div>
									<div>
										<span>出题人：${data.list[i].userName}</span>
										<span>正确率：${data.list[i].crate}</span>
									</div>
								</div>
								<div class="mid">
									<form class="layui-form" action="">
										<div class="layui-form-item">
											${data.list[i].content}
										</div>
									</form>
									<div class="answer">
										<div class="ansA">
											<span class="anss">正确答案：</span><span class="qans">${data.list[i].answer}</span>
										</div>
										<div class="ansB">
											<span class="anss">答案解析：</span><span class="des">${data.list[i].description}</span>
										</div>
									</div>
								</div>
								<div class="botm">
									<span>标签：</span>${data.list[i].kind}
								</div>
							</div>
							`
					} else {
						if (data.list[i].qtype == 0) {
							var qtype = "填空"
						}
						if (data.list[i].qtype == 3) {
							var qtype = "主观"
						}
						box += `
							<div class="queList">
								<div class="top">
									<div>
										<span>题号：${data.list[i].questionId}</span>
										<span>题型：${qtype}</span>
									</div>
									<div>
										<span>出题人：${data.list[i].userName}</span>
										<span>正确率：${data.list[i].crate}</span>
									</div>
								</div>
								<div class="mid">
									<form class="layui-form" action="">
										<div class="layui-form-item">
											<div class="ques">${data.list[i].content}</div>
										</div>
									</form>
									<div class="answer">
										<div class="ansA">
											<span class="anss">正确答案：</span><span class="qans">${data.list[i].answer}</span>
										</div>
										<div class="ansB">
											<span class="anss">答案解析：</span><span class="des">${data.list[i].description}</span>
										</div>
									</div>
								</div>
								<div class="botm">
									<span>标签：</span>${data.list[i].kind}
								</div>
							</div>
							`
					}
				}
				var str = `
				<div class="fenye1">
					<div class="zuiqian" onclick="firstPage()">
						<i class="fa fa-angle-double-left"></i>
					</div>
					<div class="qian" onclick="prePage()">
						<i class="fa fa-angle-left"></i>
					</div>
					<div class="tiaozhuan">
						<input type="" name="" id="shuruyeshu1" value="" />
					</div>
					<div class="tiaozhuan1" onclick="jump()">
						跳转
					</div>
					<div class="zongyeshu" data-total="${data.pagesSize}">
						共${data.pagesSize}页
					</div>
					<div class="dangqianye" data-cur="${data.page}">
						第${data.page}页
					</div>
					<div class="hou" onclick="nextPage()">
						<i class="fa fa-angle-right"></i>
					</div>
					<div class="zuihou" onclick="lastPage()">
						<i class="fa fa-angle-double-right"></i>
					</div>
					<div class="clear">
					</div>
				</div>
				`
				var fenye = document.getElementsByClassName("fenye")[0]
				fenye.innerHTML = str;
				var divs = document.getElementsByClassName("queListBox")[0]
				divs.innerHTML = box;
			},
			error: function() {}
		});
	}

}

function lastPage() {
	// 总页数
	var total = document.getElementsByClassName("zongyeshu")[0]
	var total1 = total.dataset.total
	// 当前页码
	var cur = document.getElementsByClassName("dangqianye")[0]
	var cur1 = cur.dataset.cur
	var authorization = localStorage.getItem("authorization");
	var data = {
		page: total1,
		size: 5
	}
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/makePaper/showQuestions',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(data),
		headers: {
			'Authorization': authorization
		},
		success: function(data) {
			var box = ""
			for (var i = 0; i < data.list.length; i++) {
				if (data.list[i].qtype == 1) {
					var qtype = "单选"
					box += `
						<div class="queList">
							<div class="top">
								<div>
									<span>题号：${data.list[i].questionId}</span>
									<span>题型：${qtype}</span>
								</div>
								<div>
									<span>出题人：${data.list[i].userName}</span>
									<span>正确率：${data.list[i].crate}</span>
								</div>
							</div>
							<div class="mid">
								<form class="layui-form" action="">
									<div class="layui-form-item">
										${data.list[i].content}
									</div>
								</form>
								<div class="answer">
									<div class="ansA">
										<span class="anss">正确答案：</span><span class="qans">${data.list[i].answer}</span>
									</div>
									<div class="ansB">
										<span class="anss">答案解析：</span><span class="des">${data.list[i].description}</span>
									</div>
								</div>
							</div>
							<div class="botm">
								<span>标签：</span>${data.list[i].kind}
							</div>
						</div>
						`
				} else if (data.list[i].qtype == 2) {
					var qtype = "多选"
					box += `
						<div class="queList">
							<div class="top">
								<div>
									<span>题号：${data.list[i].questionId}</span>
									<span>题型：${qtype}</span>
								</div>
								<div>
									<span>出题人：${data.list[i].userName}</span>
									<span>正确率：${data.list[i].crate}</span>
								</div>
							</div>
							<div class="mid">
								<form class="layui-form" action="">
									<div class="layui-form-item">
										${data.list[i].content}
									</div>
								</form>
								<div class="answer">
									<div class="ansA">
										<span class="anss">正确答案：</span><span class="qans">${data.list[i].answer}</span>
									</div>
									<div class="ansB">
										<span class="anss">答案解析：</span><span class="des">${data.list[i].description}</span>
									</div>
								</div>
							</div>
							<div class="botm">
								<span>标签：</span>${data.list[i].kind}
							</div>
						</div>
						`
				} else {
					if (data.list[i].qtype == 0) {
						var qtype = "填空"
					}
					if (data.list[i].qtype == 3) {
						var qtype = "主观"
					}
					box += `
						<div class="queList">
							<div class="top">
								<div>
									<span>题号：${data.list[i].questionId}</span>
									<span>题型：${qtype}</span>
								</div>
								<div>
									<span>出题人：${data.list[i].userName}</span>
									<span>正确率：${data.list[i].crate}</span>
								</div>
							</div>
							<div class="mid">
								<form class="layui-form" action="">
									<div class="layui-form-item">
										<div class="ques">${data.list[i].content}</div>
									</div>
								</form>
								<div class="answer">
									<div class="ansA">
										<span class="anss">正确答案：</span><span class="qans">${data.list[i].answer}</span>
									</div>
									<div class="ansB">
										<span class="anss">答案解析：</span><span class="des">${data.list[i].description}</span>
									</div>
								</div>
							</div>
							<div class="botm">
								<span>标签：</span>${data.list[i].kind}
							</div>
						</div>
						`
				}
			}
			var str = `
			<div class="fenye1">
				<div class="zuiqian" onclick="firstPage()">
					<i class="fa fa-angle-double-left"></i>
				</div>
				<div class="qian" onclick="prePage()">
					<i class="fa fa-angle-left"></i>
				</div>
				<div class="tiaozhuan">
					<input type="" name="" id="shuruyeshu1" value="" />
				</div>
				<div class="tiaozhuan1" onclick="jump()">
					跳转
				</div>
				<div class="zongyeshu" data-total="${data.pagesSize}">
					共${data.pagesSize}页
				</div>
				<div class="dangqianye" data-cur="${data.page}">
					第${data.page}页
				</div>
				<div class="hou" onclick="nextPage()">
					<i class="fa fa-angle-right"></i>
				</div>
				<div class="zuihou" onclick="lastPage()">
					<i class="fa fa-angle-double-right"></i>
				</div>
				<div class="clear">
				</div>
			</div>
			`
			var fenye = document.getElementsByClassName("fenye")[0]
			fenye.innerHTML = str;
			var divs = document.getElementsByClassName("queListBox")[0]
			divs.innerHTML = box;
		},
		error: function() {}
	});
}

function jump() {
	var pageNo = $("#shuruyeshu1").val();
	var pageNo1 = parseInt(pageNo)
	var total = document.getElementsByClassName("zongyeshu")[0]
	var total1 = total.dataset.total
	if (pageNo1 <= total1 && pageNo1 >= 1) {
		var authorization = localStorage.getItem("authorization");
		var data = {
			page: pageNo,
			size: 5
		}
		console.log("cesh", data)
		$.ajax({
			type: 'post',
			url: 'http://123.56.29.67/hengzhi-official/makePaper/showQuestions',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			data: JSON.stringify(data),
			headers: {
				'Authorization': authorization
			},
			success: function(data) {
				var box = ""
				for (var i = 0; i < data.list.length; i++) {
					if (data.list[i].qtype == 1) {
						var qtype = "单选"
						box += `
							<div class="queList">
								<div class="top">
									<div>
										<span>题号：${data.list[i].questionId}</span>
										<span>题型：${qtype}</span>
									</div>
									<div>
										<span>出题人：${data.list[i].userName}</span>
										<span>正确率：${data.list[i].crate}</span>
									</div>
								</div>
								<div class="mid">
									<form class="layui-form" action="">
										<div class="layui-form-item">
											${data.list[i].content}
										</div>
									</form>
									<div class="answer">
										<div class="ansA">
											<span class="anss">正确答案：</span><span class="qans">${data.list[i].answer}</span>
										</div>
										<div class="ansB">
											<span class="anss">答案解析：</span><span class="des">${data.list[i].description}</span>
										</div>
									</div>
								</div>
								<div class="botm">
									<span>标签：</span>${data.list[i].kind}
								</div>
							</div>
							`
					} else if (data.list[i].qtype == 2) {
						var qtype = "多选"
						box += `
							<div class="queList">
								<div class="top">
									<div>
										<span>题号：${data.list[i].questionId}</span>
										<span>题型：${qtype}</span>
									</div>
									<div>
										<span>出题人：${data.list[i].userName}</span>
										<span>正确率：${data.list[i].crate}</span>
									</div>
								</div>
								<div class="mid">
									<form class="layui-form" action="">
										<div class="layui-form-item">
											${data.list[i].content}
										</div>
									</form>
									<div class="answer">
										<div class="ansA">
											<span class="anss">正确答案：</span><span class="qans">${data.list[i].answer}</span>
										</div>
										<div class="ansB">
											<span class="anss">答案解析：</span><span class="des">${data.list[i].description}</span>
										</div>
									</div>
								</div>
								<div class="botm">
									<span>标签：</span>${data.list[i].kind}
								</div>
							</div>
							`
					} else {
						if (data.list[i].qtype == 0) {
							var qtype = "填空"
						}
						if (data.list[i].qtype == 3) {
							var qtype = "主观"
						}
						box += `
							<div class="queList">
								<div class="top">
									<div>
										<span>题号：${data.list[i].questionId}</span>
										<span>题型：${qtype}</span>
									</div>
									<div>
										<span>出题人：${data.list[i].userName}</span>
										<span>正确率：${data.list[i].crate}</span>
									</div>
								</div>
								<div class="mid">
									<form class="layui-form" action="">
										<div class="layui-form-item">
											<div class="ques">${data.list[i].content}</div>
										</div>
									</form>
									<div class="answer">
										<div class="ansA">
											<span class="anss">正确答案：</span><span class="qans">${data.list[i].answer}</span>
										</div>
										<div class="ansB">
											<span class="anss">答案解析：</span><span class="des">${data.list[i].description}</span>
										</div>
									</div>
								</div>
								<div class="botm">
									<span>标签：</span>${data.list[i].kind}
								</div>
							</div>
							`
					}
				}
				var str = `
				<div class="fenye1">
					<div class="zuiqian" onclick="firstPage()">
						<i class="fa fa-angle-double-left"></i>
					</div>
					<div class="qian" onclick="prePage()">
						<i class="fa fa-angle-left"></i>
					</div>
					<div class="tiaozhuan">
						<input type="" name="" id="shuruyeshu1" value="" />
					</div>
					<div class="tiaozhuan1" onclick="jump()">
						跳转
					</div>
					<div class="zongyeshu" data-total="${data.pagesSize}">
						共${data.pagesSize}页
					</div>
					<div class="dangqianye" data-cur="${data.page}">
						第${data.page}页
					</div>
					<div class="hou" onclick="nextPage()">
						<i class="fa fa-angle-right"></i>
					</div>
					<div class="zuihou" onclick="lastPage()">
						<i class="fa fa-angle-double-right"></i>
					</div>
					<div class="clear">
					</div>
				</div>
				`
				var fenye = document.getElementsByClassName("fenye")[0]
				fenye.innerHTML = str;
				var divs = document.getElementsByClassName("queListBox")[0]
				divs.innerHTML = box;
			},
			error: function() {}
		});
	} else {
		layer.msg("请输入合法数字")
	}
}
