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
var url = location.search.slice(4)
console.log(url)

$(document).ready(function() {
	var authorization = localStorage.getItem("authorization");
	data = {
		paperId: url,
		page: 1
	}
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/managerPaper/selectNewsFront',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(data),
		headers: {
			'Authorization': authorization
		},
		success: function(data) {
			console.log(data)
			var mmm = `
			<div id="wangyu" data-pagesize="${data.pageSize}" data-page="${data.page}">
				试卷
			</div>
			`
			var tii1 = document.getElementsByClassName("tii1")[0]
			tii1.innerHTML = mmm
			var str = ""
			var str1 = ""
			var length1 = 0
			for (var i = 0; i < data.subjectContentList.length; i++) {
				if (data.subjectContentList[i][0].qtype == 0) {
					length1++
					str += `
					<div class="qtype3">
						<div class="layui-form-item">
							<div class="ques">
								<span>${data.subjectContentList[i][0].qnumber}.</span>${data.subjectContentList[i][0].correctSubjectList[0].content}(5分)
							</div>
							<div class="quesInpu">
								<span>正确答案：</span>${data.subjectContentList[i][0].correctSubjectList[0].answer}
							</div>
							<div class="ans">
								<span>题目解析：</span>
								<img class="analysis" src="../../../../images/question.png" height="24"
									width="24" />
							</div>
						</div>
					</div>
					`
					str1 += `
					<div class="qtype3">
						<div class="layui-form-item">
							<div class="ques">
								<span>${data.subjectContentList[i][0].qnumber}.</span>${data.subjectContentList[i][0].correctSubjectList[0].content}(5分)
							</div>
							<div class="quesInpu">
								${data.studentList[i].answer}
							</div>
							<!-- 打分栏 -->
							<div class="grade">
								<span>得分：</span>
								<input type="text" class="scoreList" data-score="5" data-qn="${data.subjectContentList[i][0].qnumber}">
							</div>
						</div>
					</div>
					`
				}
				if (data.subjectContentList[i][0].qtype == 3) {
					length1++
					str += `
					<div class="qtype4">
						<div class="layui-form-item layui-form-text">
							<div class="ques"><span>${data.subjectContentList[i][0].qnumber}.</span>${data.subjectContentList[i][0].correctSubjectList[0].content}(10分)</div>
							<div class="quesInpu">
								<textarea name="desc" placeholder="" class="layui-textarea"
									disabled>${data.subjectContentList[i][0].correctSubjectList[0].answer}</textarea>
							</div>
							<div class="ans">
								<span>题目解析：</span>
								<img class="analysis" src="../../../../images/question.png" height="24"
									width="24" />
							</div>
						</div>
					</div>
					`
					str1 += `
					<div class="qtype4">
						<div class="layui-form-item layui-form-text">
							<div class="ques"><span>${data.subjectContentList[i][0].qnumber}.</span>${data.subjectContentList[i][0].correctSubjectList[0].content}(10分)</div>
							<div class="quesInpu">
								<textarea name="desc" placeholder="" class="layui-textarea"
									disabled>${data.studentList[i].answer}</textarea>
							</div>
							<!-- 打分栏 -->
							<div class="grade">
								<span>得分：</span>
								<input type="text" class="scoreList" data-score="10" data-qn="${data.subjectContentList[i][0].qnumber}">
							</div>
						</div>
					</div>
					`
				}
				// setTimeout(function() {
				// 	document.getElementsByClassName("analysis")[length1].suspensionTips({
				// 		"content": data.subjectContentList[i].correctSubjectList
				// 			.description,
				// 		position: "right"
				// 	});
				// }, 200);

			}
			var divs = document.getElementById("result")
			var paper = document.getElementById("paper")
			divs.innerHTML = str
			paper.innerHTML = str1
		},
		error: function() {}
	})
})

function isNumber(value) {
	var patrn = /^(-)?\d+(\.\d+)?$/;
	if (patrn.exec(value) == null || value == "") {
		return false
	} else {
		return true
	}
}

function check() {
	var authorization = localStorage.getItem("authorization");
	var authorization = localStorage.getItem("authorization");
	var cur = document.getElementById("wangyu")
	var page = cur.dataset.page
	var pageSize = cur.dataset.pagesize
	var listLength = $('.scoreList').length
	var list = []
	var flag = true
	for (var i = 0; i < listLength; i++) {
		var score = document.getElementsByClassName("scoreList")[i].value
		var qn = document.getElementsByClassName("scoreList")[i]
		var score1 = qn.dataset.score
		var qn1 = qn.dataset.qn
		score = parseInt(score)
		score1 = parseInt(score1)
		console.log(score, score1)
		if (isNumber(score)) {
			if (score > score1 || score < 0) {
				flag = false
			}
		} else {
			flag = false
		}
		var lista = {
			"qNumber": qn1,
			"score": score
		}
		list.push(lista);

	}
	if (flag == true) {
		res = {
			paperId: url,
			page: page
		}
		$.ajax({
			type: 'post',
			url: 'http://123.56.29.67/hengzhi-official/managerPaper/selectNewsFront',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			headers: {
				'Authorization': authorization
			},
			data: JSON.stringify(res),
			success: function(data) {
				var i = 0
				console.log(data.studentList)
				var userId = data.studentList[0].userId
				var paperId = data.studentList[0].paperId
				var res = {
					"paperId": paperId,
					"userId": userId,
					"list": list
				}
				$.ajax({
					type: 'post',
					url: 'http://123.56.29.67/hengzhi-official/managerPaper/updateAnswerPaper',
					dataType: 'json',
					contentType: 'application/json;charset=utf-8',
					headers: {
						'Authorization': authorization
					},
					data: JSON.stringify(res),
					success: function(data1) {
						console.log(data1)
					},
					error: function() {}
				});
			},
			error: function() {}
		});
		if (page < pageSize) {
			page = parseInt(page) + 1
			console.log("我无语了", page)
			var data = {
				paperId: url,
				page: page,
			}
			$.ajax({
				type: 'post',
				url: 'http://123.56.29.67/hengzhi-official/managerPaper/selectNewsFront',
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				data: JSON.stringify(data),
				headers: {
					'Authorization': authorization
				},
				success: function(data) {
					console.log(data)
					var mmm = `
					<div id="wangyu" data-pagesize="${data.pageSize}" data-page="${data.page}">
						试卷
					</div>
					`
					var tii1 = document.getElementsByClassName("tii1")[0]
					tii1.innerHTML = mmm
					var str = ""
					var str1 = ""
					var length1 = 0
					for (var i = 0; i < data.subjectContentList.length; i++) {
						console.log(data.studentList[i].qnumber)
						if (data.subjectContentList[i][0].qtype == 0) {
							length1++
							str += `
							<div class="qtype3">
								<div class="layui-form-item">
									<div class="ques">
										<span>${data.subjectContentList[i][0].qnumber}.</span>${data.subjectContentList[i][0].correctSubjectList[0].content}(5分)
									</div>
									<div class="quesInpu">
										<span>正确答案：</span>${data.subjectContentList[i][0].correctSubjectList[0].answer}
									</div>
									<div class="ans">
										<span>题目解析：</span>
										<img class="analysis" src="../../../../images/question.png" height="24"
											width="24" />
									</div>
								</div>
							</div>
							`
							str1 += `
							<div class="qtype3">
								<div class="layui-form-item">
									<div class="ques">
										<span>${data.subjectContentList[i][0].qnumber}.</span>${data.subjectContentList[i][0].correctSubjectList[0].content}(5分)
									</div>
									<div class="quesInpu">
										${data.studentList[i].answer}
									</div>
									<!-- 打分栏 -->
									<div class="grade">
										<span>得分：</span>
										<input type="text" class="scoreList" data-score="5" data-qn="${data.subjectContentList[i][0].qnumber}">
									</div>
								</div>
							</div>
							`
						}
						if (data.subjectContentList[i][0].qtype == 3) {
							length1++
							str += `
							<div class="qtype4">
								<div class="layui-form-item layui-form-text">
									<div class="ques"><span>${data.subjectContentList[i][0].qnumber}.</span>${data.subjectContentList[i][0].correctSubjectList[0].content}(10分)</div>
									<div class="quesInpu">
										<textarea name="desc" placeholder="" class="layui-textarea"
											disabled>${data.subjectContentList[i][0].correctSubjectList[0].answer}</textarea>
									</div>
									<div class="ans">
										<span>题目解析：</span>
										<img class="analysis" src="../../../../images/question.png" height="24"
											width="24" />
									</div>
								</div>
							</div>
							`
							str1 += `
							<div class="qtype4">
								<div class="layui-form-item layui-form-text">
									<div class="ques"><span>${data.subjectContentList[i][0].qnumber}.</span>${data.subjectContentList[i][0].correctSubjectList[0].content}(10分)</div>
									<div class="quesInpu">
										<textarea name="desc" placeholder="" class="layui-textarea"
											disabled>${data.studentList[i].answer}</textarea>
									</div>
									<!-- 打分栏 -->
									<div class="grade">
										<span>得分：</span>
										<input type="text" class="scoreList" data-score="10" data-qn="${data.subjectContentList[i][0].qnumber}">
									</div>
								</div>
							</div>
							`
						}
						// setTimeout(function() {
						// 	document.getElementsByClassName("analysis")[length1].suspensionTips({
						// 		"content": data.subjectContentList[i].correctSubjectList
						// 			.description,
						// 		position: "right"
						// 	});
						// }, 200);

					}
					var divs = document.getElementById("result")
					var paper = document.getElementById("paper")
					divs.innerHTML = str
					paper.innerHTML = str1
				},
				error: function() {}
			})
		} else {
			layer.msg("您已改完所有试题")
			setTimeout(function() {
				location.href = '../preCorList/preCorList.html'
			}, 3000)
		}

	} else {
		list = []
		layer.msg("请输入合理分数")
	}
}

function nextPage() {


}
