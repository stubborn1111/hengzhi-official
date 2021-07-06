var key = ""

function searchByWord() {
	var aha = $("#searchByword").val()
	console.log(aha)
	key = aha
	var authorization = localStorage.getItem("authorization");
	var data = {
		page: 1,
		size: 5,
		keyWord: key
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
			if (data.list == null) {
				layer.msg("未找到相关题目")
				key = ""
			} else {
				var box = ""
				for (var i = 0; i < data.list.length; i++) {
					if (data.list[i].qtype == 1) {
						var content = data.list[i].content
						var arr = content.slice(1, content.length - 1).split(",");
						var options = arr.length
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
	        <div class="ques">
	          <div>${arr[0]}</div>
	        `
						for (var j = 1; j < options; j++) {
							var dax = String.fromCharCode(64 + j)
							box += `
	            <div>${dax}.${arr[j]}</div>
	          `
						}
						box += `
	    </div>
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
						var content = data.list[i].content
						var arr = content.slice(1, content.length - 1).split(",");
						var options = arr.length
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
	             <div class="ques">
	               <div>${arr[0]}</div>
	       `
						for (var j = 1; j < options; j++) {
							var dax = String.fromCharCode(64 + j)
							box += `
	           <div>${dax}.${arr[j]}</div>
	         `
						}
						box += `
	         </div>
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
				layui.use('form', function() {
					var form = layui.form;
					form.render();
				});
			}

		},
		error: function() {}
	});
}
$(document).ready(function() {
	var authorization = localStorage.getItem("authorization");
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/managerPaper/selectUnExamMessage',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		headers: {
			'Authorization': authorization
		},
		success: function(res) {
			var number = res.number
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
				<span class="layui-badge huizhang" title="您有${number}条留言未审核">${number}</span>
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
							window.location.href =
								"../staffInfo/staffInfo.html";
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
	window.location.href = "../../../login/login.html";
}
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
				var choices = []
				var ok = true
				var content = $("#ques").val()
				choices.push(content)
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
					if (choices.length < 3) {
						ok = false
					}
				}
				if (type == 2) {
					for (var i = 0; i < 4; i++) {
						var choice = document.getElementsByClassName("choice")[i].value
						if (choice.match(/^\s*$/)) {} else {
							choices.push(choice)
						}
					}
					if (choices.length < 4) {
						ok = false
					}
				}
				if (ok == true) {
					var authorization = localStorage.getItem("authorization");
					console.log(choices)
					data = {
						content: choices,
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
							if (data.msg == "success") {
								layer.msg("添加成功")
								layer.close(index)
								$("input").each(function() {
									$(this).val("")
								})
							} else {
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
		size: 5,
		keyWord: key
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
					var content = data.list[i].content
					var arr = content.slice(1, content.length - 1).split(",");
					var options = arr.length
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
	        <div class="ques">
	          <div>${arr[0]}</div>
	        `
					for (var j = 1; j < options; j++) {
						var dax = String.fromCharCode(64 + j)
						box += `
	            <div>${dax}.${arr[j]}</div>
	          `
					}
					box += `
	    </div>
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
					var content = data.list[i].content
					var arr = content.slice(1, content.length - 1).split(",");
					var options = arr.length
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
	             <div class="ques">
	               <div>${arr[0]}</div>
	       `
					for (var j = 1; j < options; j++) {
						var dax = String.fromCharCode(64 + j)
						box += `
	           <div>${dax}.${arr[j]}</div>
	         `
					}
					box += `
	         </div>
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
			layui.use('form', function() {
				var form = layui.form;
				form.render();
			});
		},
		error: function() {}
	});
})

function firstPage() {
	var authorization = localStorage.getItem("authorization");
	var data = {
		page: 1,
		size: 5,
		keyWord: key
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
					var content = data.list[i].content
					var arr = content.slice(1, content.length - 1).split(",");
					var options = arr.length
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
	        <div class="ques">
	          <div>${arr[0]}</div>
	        `
					for (var j = 1; j < options; j++) {
						var dax = String.fromCharCode(64 + j)
						box += `
	            <div>${dax}.${arr[j]}</div>
	          `
					}
					box += `
	    </div>
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
					var content = data.list[i].content
					var arr = content.slice(1, content.length - 1).split(",");
					var options = arr.length
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
	             <div class="ques">
	               <div>${arr[0]}</div>
	       `
					for (var j = 1; j < options; j++) {
						var dax = String.fromCharCode(64 + j)
						box += `
	           <div>${dax}.${arr[j]}</div>
	         `
					}
					box += `
	         </div>
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
			layui.use('form', function() {
				var form = layui.form;
				form.render();
			});
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
			size: 5,
			keyWord: key
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
						var content = data.list[i].content
						var arr = content.slice(1, content.length - 1).split(",");
						var options = arr.length
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
		        <div class="ques">
		          <div>${arr[0]}</div>
		        `
						for (var j = 1; j < options; j++) {
							var dax = String.fromCharCode(64 + j)
							box += `
		            <div>${dax}.${arr[j]}</div>
		          `
						}
						box += `
		    </div>
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
						var content = data.list[i].content
						var arr = content.slice(1, content.length - 1).split(",");
						var options = arr.length
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
		             <div class="ques">
		               <div>${arr[0]}</div>
		       `
						for (var j = 1; j < options; j++) {
							var dax = String.fromCharCode(64 + j)
							box += `
		           <div>${dax}.${arr[j]}</div>
		         `
						}
						box += `
		         </div>
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
				layui.use('form', function() {
					var form = layui.form;
					form.render();
				});
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
			size: 5,
			keyWord: key
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
						var content = data.list[i].content
						var arr = content.slice(1, content.length - 1).split(",");
						var options = arr.length
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
						<div class="ques">
							<div>${arr[0]}</div>
            `
						for (var j = 1; j < options; j++) {
							var dax = String.fromCharCode(64 + j)
							box += `
                <div>${dax}.${arr[j]}</div>
              `
						}
						box += `
				</div>
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
						var content = data.list[i].content
						var arr = content.slice(1, content.length - 1).split(",");
						var options = arr.length
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
           			<div class="ques">
           				<div>${arr[0]}</div>
           `
						for (var j = 1; j < options; j++) {
							var dax = String.fromCharCode(64 + j)
							box += `
               <div>${dax}.${arr[j]}</div>
             `
						}
						box += `
           	</div>
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
				layui.use('form', function() {
					var form = layui.form;
					form.render();
				});
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
		size: 5,
		keyWord: key
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
					var content = data.list[i].content
					var arr = content.slice(1, content.length - 1).split(",");
					var options = arr.length
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
	        <div class="ques">
	          <div>${arr[0]}</div>
	        `
					for (var j = 1; j < options; j++) {
						var dax = String.fromCharCode(64 + j)
						box += `
	            <div>${dax}.${arr[j]}</div>
	          `
					}
					box += `
	    </div>
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
					var content = data.list[i].content
					var arr = content.slice(1, content.length - 1).split(",");
					var options = arr.length
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
	             <div class="ques">
	               <div>${arr[0]}</div>
	       `
					for (var j = 1; j < options; j++) {
						var dax = String.fromCharCode(64 + j)
						box += `
	           <div>${dax}.${arr[j]}</div>
	         `
					}
					box += `
	         </div>
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
			layui.use('form', function() {
				var form = layui.form;
				form.render();
			});
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
			size: 5,
			keyWord: key
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
						var content = data.list[i].content
						var arr = content.slice(1, content.length - 1).split(",");
						var options = arr.length
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
		        <div class="ques">
		          <div>${arr[0]}</div>
		        `
						for (var j = 1; j < options; j++) {
							var dax = String.fromCharCode(64 + j)
							box += `
		            <div>${dax}.${arr[j]}</div>
		          `
						}
						box += `
		    </div>
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
						var content = data.list[i].content
						var arr = content.slice(1, content.length - 1).split(",");
						var options = arr.length
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
		             <div class="ques">
		               <div>${arr[0]}</div>
		       `
						for (var j = 1; j < options; j++) {
							var dax = String.fromCharCode(64 + j)
							box += `
		           <div>${dax}.${arr[j]}</div>
		         `
						}
						box += `
		         </div>
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
				layui.use('form', function() {
					var form = layui.form;
					form.render();
				});
			},
			error: function() {}
		});
	} else {
		layer.msg("请输入合法数字")
	}
}
