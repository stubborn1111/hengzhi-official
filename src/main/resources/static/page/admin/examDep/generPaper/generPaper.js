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
								window.location.href =
									"../../login/login.html";
							}, 2000);
						} else {
							layer.msg("修改失败")
						}
					},
					error: function() {}
				});
			},
			btn2: function() {

			}
		});
	});
}

// 退出登录
function logout() {
	localStorage.setItem("authorization", "");
	window.location.href = "../../../login/login.html";
}
// 自动组卷
// 查找tag
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
			var msg1 = document.getElementById("automaticTag")
			msg1.innerHTML = str
		},
		error: function() {}
	});
}
var list = []

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
	var taplist = document.getElementById("automaticTag1")
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
	var taplist = document.getElementById("automaticTag1")
	taplist.innerHTML = str
}

function isNumber(value) {
	var patrn = /^(-)?\d+(\.\d+)?$/;
	if (patrn.exec(value) == null || value == "") {
		return false
	} else {
		return true
	}
}
var notEnough = []
var enough = []

function test1() {
	var authorization = localStorage.getItem("authorization");
	console.log(list)
	if (list.length > 0) {
		var num1 = document.getElementsByClassName("autoType")[0].value
		var num2 = document.getElementsByClassName("autoType")[1].value
		var num3 = document.getElementsByClassName("autoType")[2].value
		var num4 = document.getElementsByClassName("autoType")[3].value
		if (!isNumber(num1) || !isNumber(num2) || !isNumber(num3) || !isNumber(num4) || num1 < 0 || num2 < 0 || num3 <
			0 || num4 < 0 || (
				num1 == 0 && num2 == 0 && num3 == 0 && num4 == 0)) {
			layer.msg("数量请输入有效数字")
		} else {
			var kindlist = list[0].name
			for (var i = 1; i < list.length; i++) {
				kindlist += "|" + list[i].name
			}
			data = {
				num0: num3,
				num1: num1,
				num2: num2,
				num3: num4,
				type: kindlist
			}
			$.ajax({
				type: 'post',
				url: 'http://123.56.29.67/hengzhi-official/makePaper/makePaper',
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				headers: {
					'Authorization': authorization
				},
				data: JSON.stringify(data),
				success: function(data) {
					var quesl = ""
					console.log(data)
					if (data.questions_fill == "not enough") {
						notEnough.push(" 填空题")
					} else if (data.questions_fill == null) {

					} else {
						for (var j = 0; j < data.questions_fill.length; j++) {
							quesl +=
								`
						<div class="qtype1">
							<div class="layui-form-item">
								<div class="ques" data-type="${data.questions_fill[j].qType}">${data.questions_fill[j].content}</div>
							</div>
						</div>
						`
							var enougha = {
								questionId: data.questions_fill[j].questionId,
								qType: data.questions_fill[j].qtype
							}
							enough.push(enougha)
						}
					}
					if (data.questions_multiple == "not enough") {
						notEnough.push(" 多选题")
					} else if (data.questions_multiple == null) {

					} else {
						for (var j = 0; j < data.questions_multiple.length; j++) {
							var content = data.questions_multiple[j].content
							var arr = content.slice(1, content.length - 1).split(",");
							var options = arr.length

							quesl +=
								`
						<div class="qtype1">
							<div class="layui-form-item">
								<div class="ques" data-type="${data.questions_multiple[j].qType}">${arr[0]}
						`
							for (var k = 1; k < options; k++) {
								var dax = String.fromCharCode(64 + k)
								quesl += `
										            <div>${dax}.${arr[k]}</div>
										          `
							}
							quesl += `
						</div>
							</div>
						</div>
						`
							var enougha = {
								questionId: data.questions_multiple[j].questionId,
								qType: data.questions_multiple[j].qtype
							}
							enough.push(enougha)
						}
					}

					if (data.questions_subjective == "not enough") {
						notEnough.push(" 主观题")
					} else if (data.questions_subjective == null) {

					} else {
						for (var j = 0; j < data.questions_subjective.length; j++) {
							quesl +=
								`
						<div class="qtype1">
							<div class="layui-form-item">
								<div class="ques" data-type="${data.questions_subjective[j].qType}">${data.questions_subjective[j].content}</div>
							</div>
						</div>
						`
							var enougha = {
								questionId: data.questions_subjective[j].questionId,
								qType: data.questions_subjective[j].qtype
							}
							enough.push(enougha)
						}
					}

					if (data.questions_single == "not enough") {
						notEnough.push(" 单选题")
					} else if (data.questions_single == null) {

					} else {

						for (var j = 0; j < data.questions_single.length; j++) {
							var content = data.questions_single[j].content
							var arr = content.slice(1, content.length - 1).split(",");
							var options = arr.length

							quesl +=
								`
						<div class="qtype1">
							<div class="layui-form-item">
								<div class="ques" data-type="${data.questions_single[j].qType}">${arr[0]}
						`
							for (var k = 1; k < options; k++) {
								var dax = String.fromCharCode(64 + k)
								quesl += `
										            <div>${dax}.${arr[k]}</div>
										          `
							}
							quesl += `
						</div>
							</div>
						</div>
						`
							var enougha = {
								questionId: data.questions_single[j].questionId,
								qType: data.questions_single[j].qtype
							}
							enough.push(enougha)
						}
					}

					setTimeout(function() {
						if (notEnough.length > 0) {
							var strs = ""
							for (var i = 0; i < notEnough.length; i++) {
								strs += notEnough[i]
							}
							strs += "不够"
							layer.msg(strs)
							notEnough = []
						} else {
							var testyl = document.getElementById("testyl")
							testyl.innerHTML = quesl
							layer.open({
								type: 1,
								title: '预览试卷',
								area: ['500px', '450px'],
								shade: 0.4,
								content: $("#testyl"),
								btn: ['下一步'],
								scrollbar: false,
								yes: function(res) {
									layui.use('layer', function() {
										var $ = layui.jquery;
										var element = layui.element;
										var layer = layui.layer;
										var form = layui.form;
										layer.open({
											type: 1,
											title: '补充试卷信息',
											area: ['450px', '300px'],
											shade: 0.4,
											content: $("#testxx"),
											offset: '0px',
											btn: ['确认组卷', '取消'],
											scrollbar: false,
											yes: function(index) {
												var ok = true
												for (var i = 0; i <
													2; i++) {
													var xx =
														document
														.getElementsByClassName(
															"xx")[
															i]
														.value
													if (xx.match(
															/^\s*$/
														)) {
														layer.msg(
															"请将信息补充完全"
														)
														ok = false
														break
													}

												}
												if (ok == true) {
													layer.close(
														res)
													var code = ""
													code = `
													${data.code}
													`
													var codea =
														document
														.getElementById(
															"testcode"
														)
													codea
														.innerHTML =
														code
													var authorization =
														localStorage
														.getItem(
															"authorization"
														);
													data = {
														list: enough,
														paperName: document
															.getElementsByClassName(
																"xx"
															)[
																0
															]
															.value,
														description: document
															.getElementsByClassName(
																"xx"
															)[
																2
															]
															.value,
														beginTime: document
															.getElementsByClassName(
																"xx"
															)[
																1
															]
															.value
															.slice(
																0,
																19
															),
														deadline: document
															.getElementsByClassName(
																"xx"
															)[
																1
															]
															.value
															.slice(
																21
															),
													}
													$.ajax({
														type: 'post',
														url: 'http://123.56.29.67/hengzhi-official/makePaper/makePaperSuccess',
														dataType: 'json',
														contentType: 'application/json;charset=utf-8',
														headers: {
															'Authorization': authorization
														},
														data: JSON
															.stringify(
																data
															),
														success: function(
															data
														) {
															$("input")
																.each(
																	function() {
																		$(this)
																			.val(
																				""
																			)
																	}
																)
															layer
																.close(
																	index
																)
															var code =
																""
															code +=
																`${data.code}`
															var codea =
																document
																.getElementById(
																	"testcode"
																)
															codea
																.innerHTML =
																code
															console
																.log(
																	code
																)
															layer
																.open({
																	type: 1,
																	title: '邀请码',
																	area: ['150px',
																		'200px'
																	],
																	shade: 0.4,
																	content: $(
																		"#testcode"
																	),
																	btn: [
																		'收到'
																	],
																	scrollbar: false,
																	yes: function(
																		res
																	) {
																		layer
																			.close(
																				res
																			)
																	},
																});

														},
														error: function() {}
													});
												}
											},
											btn2: function() {

											}
										});
									});
								},
							});

						}
					}, 300);

				},
				error: function() {}
			});
		}
	} else {
		layer.msg("请选择题目标签")
	}
}
// 手动组卷
function findTag1() {
	var authorization = localStorage.getItem("authorization");
	var kind = $("#handsur").val()
	console.log(kind)
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
				<button onclick="select1(this)" type="button" class="tag lauui-btn layui-btn-primary" data-id="${data[j].tagId}" data-name="${data[j].tagName}">${data[j].tagName}</button>
				`
			}
			var msg1 = document.getElementById("handTag")
			msg1.innerHTML = str
		},
		error: function() {}
	});
}
// 
var list1 = []

function select1(e) {
	var save = true
	var str = ""
	for (var i = 0; i < list1.length; i++) {
		if (e.dataset.id == list1[i].id) {
			save = false
		}
	}
	if (save == true) {
		var lista = {
			"id": e.dataset.id,
			"name": e.dataset.name
		}
		list1.push(lista)
	}
	for (var i = 0; i < list1.length; i++) {
		str += `
		<button type="button" onclick="notag1(this)" class="tag lauui-btn layui-btn-primary" data-id="${list1[i].id}" data-name="${list1[i].name}">${list1[i].name}</button>
		`
	}
	var taplist = document.getElementById("handTag1")
	taplist.innerHTML = str
}

function notag1(e) {
	var save = true
	var str = ""
	for (var i = 0; i < list1.length; i++) {
		if (e.dataset.id == list1[i].id) {
			list1.splice(i, 1);
			break;
		}
	}
	for (var i = 0; i < list1.length; i++) {
		str += `
		<button type="button" onclick="notag1(this)" class="tag lauui-btn layui-btn-primary" data-id="${list1[i].id}" data-name="${list1[i].name}">${list1[i].name}</button>
		`
	}
	var taplist = document.getElementById("handTag1")
	taplist.innerHTML = str
}

function searchQ() {
	var authorization = localStorage.getItem("authorization");
	var kind = []
	for (var i = 0; i < list1.length; i++) {
		var kinda = list1[i].name
		kind.push(kinda)
	}
	var type = []
	var type1 = document.getElementsByClassName("handType")[0].checked
	var type2 = document.getElementsByClassName("handType")[1].checked
	var type3 = document.getElementsByClassName("handType")[2].checked
	var type4 = document.getElementsByClassName("handType")[3].checked
	if (type1 == true) {
		type.push(1)
	}
	if (type2 == true) {
		type.push(2)
	}
	if (type3 == true) {
		type.push(0)
	}
	if (type4 == true) {
		type.push(3)
	}
	var data = {
		page: 1,
		size: 2,
		kind: kind,
		type: type
	}
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/makePaper/findQuestions',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(data),
		headers: {
			'Authorization': authorization
		},
		success: function(data) {
			var box = ""
			if (data.list == null) {
				layer.msg("没有相关题目，可以向题库添加一些新题目哟")
				box = ``
				var divs = document.getElementById("queListBox")
				divs.innerHTML = box;
			} else {
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
					  <div><Button class="add lauui-btn" onclick="addTo(this)" data-type="${data.list[i].qtype}" data-id="${data.list[i].questionId}">加入试卷</Button></div>
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
						   <div><Button class="add lauui-btn" onclick="addTo(this)" data-type="${data.list[i].qtype}" data-id="${data.list[i].questionId}">加入试卷</Button></div>
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
							  <div><Button class="add lauui-btn" onclick="addTo(this)" data-type="${data.list[i].qtype}" data-id="${data.list[i].questionId}">加入试卷</Button></div>
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
				var divs = document.getElementById("queListBox")
				divs.innerHTML = box;
			}

		},

		error: function() {}
	});
}

function firstPage() {
	var authorization = localStorage.getItem("authorization");
	var kind = []
	for (var i = 0; i < list1.length; i++) {
		var kinda = list1[i].name
		kind.push(kinda)
	}
	var type = []
	var type1 = document.getElementsByClassName("handType")[0].checked
	var type2 = document.getElementsByClassName("handType")[1].checked
	var type3 = document.getElementsByClassName("handType")[2].checked
	var type4 = document.getElementsByClassName("handType")[3].checked
	if (type1 == true) {
		type.push(1)
	}
	if (type2 == true) {
		type.push(2)
	}
	if (type3 == true) {
		type.push(0)
	}
	if (type4 == true) {
		type.push(3)
	}
	var data = {
		page: 1,
		size: 2,
		kind: kind,
		type: type
	}
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/makePaper/findQuestions',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(data),
		headers: {
			'Authorization': authorization
		},
		success: function(data) {
			var box = ""
			if (data.list == null) {
				layer.msg("没有相关题目，可以向题库添加一些新题目哟")
				box = ``
				var divs = document.getElementById("queListBox")
				divs.innerHTML = box;
			} else {
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
					  <div><Button class="add lauui-btn" onclick="addTo(this)" data-type="${data.list[i].qtype}" data-id="${data.list[i].questionId}">加入试卷</Button></div>
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
						   <div><Button class="add lauui-btn" onclick="addTo(this)" data-type="${data.list[i].qtype}" data-id="${data.list[i].questionId}">加入试卷</Button></div>
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
							  <div><Button class="add lauui-btn" onclick="addTo(this)" data-type="${data.list[i].qtype}" data-id="${data.list[i].questionId}">加入试卷</Button></div>
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
				var divs = document.getElementById("queListBox")
				divs.innerHTML = box;
			}

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
		var kind = []
		for (var i = 0; i < list1.length; i++) {
			var kinda = list1[i].name
			kind.push(kinda)
		}
		var type = []
		var type1 = document.getElementsByClassName("handType")[0].checked
		var type2 = document.getElementsByClassName("handType")[1].checked
		var type3 = document.getElementsByClassName("handType")[2].checked
		var type4 = document.getElementsByClassName("handType")[3].checked
		if (type1 == true) {
			type.push(1)
		}
		if (type2 == true) {
			type.push(2)
		}
		if (type3 == true) {
			type.push(0)
		}
		if (type4 == true) {
			type.push(3)
		}
		var data = {
			page: page,
			size: 2,
			kind: kind,
			type: type
		}
		$.ajax({
			type: 'post',
			url: 'http://123.56.29.67/hengzhi-official/makePaper/findQuestions',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			data: JSON.stringify(data),
			headers: {
				'Authorization': authorization
			},
			success: function(data) {
				var box = ""
				if (data.list == null) {
					layer.msg("没有相关题目，可以向题库添加一些新题目哟")
					box = ``
					var divs = document.getElementById("queListBox")
					divs.innerHTML = box;
				} else {
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
						  <div><Button class="add lauui-btn" onclick="addTo(this)" data-type="${data.list[i].qtype}" data-id="${data.list[i].questionId}">加入试卷</Button></div>
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
							   <div><Button class="add lauui-btn" onclick="addTo(this)" data-type="${data.list[i].qtype}" data-id="${data.list[i].questionId}">加入试卷</Button></div>
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
								  <div><Button class="add lauui-btn" onclick="addTo(this)" data-type="${data.list[i].qtype}" data-id="${data.list[i].questionId}">加入试卷</Button></div>
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
					var divs = document.getElementById("queListBox")
					divs.innerHTML = box;
				}

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
		var kind = []
		for (var i = 0; i < list1.length; i++) {
			var kinda = list1[i].name
			kind.push(kinda)
		}
		var type = []
		var type1 = document.getElementsByClassName("handType")[0].checked
		var type2 = document.getElementsByClassName("handType")[1].checked
		var type3 = document.getElementsByClassName("handType")[2].checked
		var type4 = document.getElementsByClassName("handType")[3].checked
		if (type1 == true) {
			type.push(1)
		}
		if (type2 == true) {
			type.push(2)
		}
		if (type3 == true) {
			type.push(0)
		}
		if (type4 == true) {
			type.push(3)
		}
		var data = {
			page: page,
			size: 2,
			kind: kind,
			type: type
		}
		$.ajax({
			type: 'post',
			url: 'http://123.56.29.67/hengzhi-official/makePaper/findQuestions',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			data: JSON.stringify(data),
			headers: {
				'Authorization': authorization
			},
			success: function(data) {
				var box = ""
				if (data.list == null) {
					layer.msg("没有相关题目，可以向题库添加一些新题目哟")
					box = ``
					var divs = document.getElementById("queListBox")
					divs.innerHTML = box;
				} else {
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
						  <div><Button class="add lauui-btn" onclick="addTo(this)" data-type="${data.list[i].qtype}" data-id="${data.list[i].questionId}">加入试卷</Button></div>
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
							   <div><Button class="add lauui-btn" onclick="addTo(this)" data-type="${data.list[i].qtype}" data-id="${data.list[i].questionId}">加入试卷</Button></div>
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
								  <div><Button class="add lauui-btn" onclick="addTo(this)" data-type="${data.list[i].qtype}" data-id="${data.list[i].questionId}">加入试卷</Button></div>
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
					var divs = document.getElementById("queListBox")
					divs.innerHTML = box;
				}

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
	var kind = []
	for (var i = 0; i < list1.length; i++) {
		var kinda = list1[i].name
		kind.push(kinda)
	}
	var type = []
	var type1 = document.getElementsByClassName("handType")[0].checked
	var type2 = document.getElementsByClassName("handType")[1].checked
	var type3 = document.getElementsByClassName("handType")[2].checked
	var type4 = document.getElementsByClassName("handType")[3].checked
	if (type1 == true) {
		type.push(1)
	}
	if (type2 == true) {
		type.push(2)
	}
	if (type3 == true) {
		type.push(0)
	}
	if (type4 == true) {
		type.push(3)
	}
	var data = {
		page: total1,
		size: 2,
		kind: kind,
		type: type
	}
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/makePaper/findQuestions',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(data),
		headers: {
			'Authorization': authorization
		},
		success: function(data) {
			var box = ""
			if (data.list == null) {
				layer.msg("没有相关题目，可以向题库添加一些新题目哟")
				box = ``
				var divs = document.getElementById("queListBox")
				divs.innerHTML = box;
			} else {
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
					  <div><Button class="add lauui-btn" onclick="addTo(this)" data-type="${data.list[i].qtype}" data-id="${data.list[i].questionId}">加入试卷</Button></div>
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
						   <div><Button class="add lauui-btn" onclick="addTo(this)" data-type="${data.list[i].qtype}" data-id="${data.list[i].questionId}">加入试卷</Button></div>
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
							  <div><Button class="add lauui-btn" onclick="addTo(this)" data-type="${data.list[i].qtype}" data-id="${data.list[i].questionId}">加入试卷</Button></div>
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
				var divs = document.getElementById("queListBox")
				divs.innerHTML = box;
			}

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
		var kind = []
		for (var i = 0; i < list1.length; i++) {
			var kinda = list1[i].name
			kind.push(kinda)
		}
		var type = []
		var type1 = document.getElementsByClassName("handType")[0].checked
		var type2 = document.getElementsByClassName("handType")[1].checked
		var type3 = document.getElementsByClassName("handType")[2].checked
		var type4 = document.getElementsByClassName("handType")[3].checked
		if (type1 == true) {
			type.push(1)
		}
		if (type2 == true) {
			type.push(2)
		}
		if (type3 == true) {
			type.push(0)
		}
		if (type4 == true) {
			type.push(3)
		}
		var data = {
			page: pageNo,
			size: 2,
			kind: kind,
			type: type
		}
		$.ajax({
			type: 'post',
			url: 'http://123.56.29.67/hengzhi-official/makePaper/findQuestions',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			data: JSON.stringify(data),
			headers: {
				'Authorization': authorization
			},
			success: function(data) {
				var box = ""
				if (data.list == null) {
					layer.msg("没有相关题目，可以向题库添加一些新题目哟")
					box = ``
					var divs = document.getElementById("queListBox")
					divs.innerHTML = box;
				} else {
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
						  <div><Button class="add lauui-btn" onclick="addTo(this)" data-type="${data.list[i].qtype}" data-id="${data.list[i].questionId}">加入试卷</Button></div>
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
							   <div><Button class="add lauui-btn" onclick="addTo(this)" data-type="${data.list[i].qtype}" data-id="${data.list[i].questionId}">加入试卷</Button></div>
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
								  <div><Button class="add lauui-btn" onclick="addTo(this)" data-type="${data.list[i].qtype}" data-id="${data.list[i].questionId}">加入试卷</Button></div>
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
					var divs = document.getElementById("queListBox")
					divs.innerHTML = box;
				}

			},

			error: function() {}
		});
	} else {
		layer.msg("请输入合法数字")
	}
}
var addList = []
var showlist = []
// 添加到题目区域
function addTo(e) {
	var authorization = localStorage.getItem("authorization");
	var id = e.dataset.id
	var type = e.dataset.type
	var addLista = {
		questionId: id,
		qType: type,
	}
	addList.push(addLista)
	data = {
		questionId: id,
		type: type,
	}
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/makePaper/findQuestionsById',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		headers: {
			'Authorization': authorization
		},
		data: JSON.stringify(data),
		success: function(data) {
			var str = ""
			console.log(data)
			if (data.qtype == 0) {
				qtype = 3
				type = "填空"
			}
			if (data.qtype == 1) {
				qtype = 1
				type = "单选"
			}
			if (data.qtype == 2) {
				qtype = 2
				type = "多选"
			}
			if (data.qtype == 3) {
				qtype = 4
				type = "主观"
			}
			var showlista = {
				qType: qtype,
				qType1: data.qtype,
				type: type,
				content: data.content
			}
			showlist.push(showlista)
			for (var i = 0; i < showlist.length; i++) {
				if (showlist[i].qType == 1 || showlist[i].qType == 2) {
					var content = showlist[i].content
					var arr = content.slice(1, content.length - 1).split(",");
					var options = arr.length
					str += `
					<div class="qtype${showlist[i].qType}">
						<div class="layui-form-item">
							<div class="ques" data-type="${showlist[i].qType1}"><span>${i + 1}.(${showlist[i].type})</span>${arr[0]}
					`
					for (var j = 1; j < options; j++) {
						var dax = String.fromCharCode(64 + j)
						str += `
						 <div>${dax}.${arr[j]}</div>
						`
					}
					str += `		
								</div>
							</div>
						</div>
						`
				} else {
					str += `
			<div class="qtype${showlist[i].qType}">
				<div class="layui-form-item">
					<div class="ques" data-type="${showlist[i].qType1}"><span>${i + 1}.(${showlist[i].type})</span>${showlist[i].content}</div>
				</div>
			</div>
			`
				}

			}

			var yulan = document.getElementById("yulan")
			yulan.innerHTML = str
		},
		error: function() {}
	});
}
//下一步
function next() {
	// if(showlist.length>0){
	layui.use('layer', function() {
		var $ = layui.jquery;
		var element = layui.element;
		var layer = layui.layer;
		var form = layui.form;
					layer.open({
						type: 1,
						title: '补充试卷信息',
						area: ['450px', '300px'],
						shade: 0.4,
						content: $("#testxx"),
						offset: '0px',
						btn: ['确认组卷', '取消'],
						scrollbar: false,
						yes: function(index) {
							var ok = true
							for (var i = 0; i <
								2; i++) {
								var xx =
									document
									.getElementsByClassName(
										"xx")[
										i]
									.value
								if (xx.match(
										/^\s*$/
									)) {
									layer.msg(
										"请将信息补充完全"
									)
									ok = false
									break
								}

							}
							if (ok == true) {
								var code = ""
								code = `
													${data.code}
													`
								var codea =
									document
									.getElementById(
										"testcode"
									)
								codea
									.innerHTML =
									code
								var authorization =
									localStorage
									.getItem(
										"authorization"
									);
								data = {
									list: enough,
									paperName: document
										.getElementsByClassName(
											"xx"
										)[
											0
										]
										.value,
									description: document
										.getElementsByClassName(
											"xx"
										)[
											2
										]
										.value,
									beginTime: document
										.getElementsByClassName(
											"xx"
										)[
											1
										]
										.value
										.slice(
											0,
											19
										),
									deadline: document
										.getElementsByClassName(
											"xx"
										)[
											1
										]
										.value
										.slice(
											21
										),
								}
								$.ajax({
									type: 'post',
									url: 'http://123.56.29.67/hengzhi-official/makePaper/makePaperSuccess',
									dataType: 'json',
									contentType: 'application/json;charset=utf-8',
									headers: {
										'Authorization': authorization
									},
									data: JSON
										.stringify(
											data
										),
									success: function(
										data
									) {
										$("input")
											.each(
												function() {
													$(this)
														.val(
															""
														)
												}
											)
										layer.close(index)
										var code =""
										code +=`${data.code}`
										var codea =document.getElementById("testcode")
										codea.innerHTML =code
										console
											.log(code)
										layer
											.open({
												type: 1,
												title: '邀请码',
												area: ['150px','200px'],
												shade: 0.4,
												content: $("#testcode"),
												btn: ['收到'],
												scrollbar: false,
												yes: function(res) {
													layer.close(res)
												},
											});

									},
									error: function() {}
								});
							}
						},
						btn2: function() {

						}
					});
				

	});
	// }
	// else{
	// 	layer.msg("请先添加题目")
	// }
}
