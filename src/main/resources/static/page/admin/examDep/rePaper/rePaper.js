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
	setTimeout(function() {
		window.location.href = "../../login/login.html";
	}, 2000);
}

$(document).ready(function() {
	var authorization = localStorage.getItem("authorization");
	var userId = location.search.slice(4,5)
	var paperId = location.search.slice(14)
	console.log(userId)
	console.log(paperId)
	var data = {
		"paperId": paperId,
		"userId": userId
	}
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/studentTest/viewTestedPaper',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(data),
		headers: {
			'Authorization': authorization
		},
		success: function(data) {
			console.log(data)
			var str = "";
			var item = "";
			str = `
				<div class="paperName">${data.PaperInformation.name}</div>
				<div class="score"><span>${data.PaperInformation.score}</span>/<span>${data.PaperInformation.totalScore}</span></div>
				<div class="answerTime">${data.PaperInformation.answerTime}</div>
			`
			// console.log(str)
			var info1 = document.getElementsByClassName("info")[0];
			info1.innerHTML = str;

			for (var i = 0; i < data.questionList.length; i++) {
				var qNumber = data.questionList[i].qNumber;
				var content = data.questionList[i].content;
				var description = data.questionList[i].description;
				var qType = data.questionList[i].qType;
				var kind = data.questionList[i].kind;
				var cRate = data.questionList[i].cRate;
				var answer = data.questionList[i].answer;

				// var answer = data.answerList[i].answer;
				var score = data.answerList[i].score;

				if (qType == 1) {
					item += `
          <div class="qtype1 qtype">
            <div class="layui-form-item">
							<span>${qNumber}</span>
              ${content}
            </div>
						<div class="ans">
							<span>正确答案：</span>
							<span class="qans">${answer}</span>
							<div>
									<span>题目解析：</span>
									<i class="layui-icon layui-icon-survey" title="${description}"></i>
							</div>     
						</div>
						<div class="rate">
							<span>正确率：${cRate}</span>
						</div>
						<div class="kind">
							<span>题目标签：${kind}</span>
						</div>
          </div>
          `
					var qtype1 = document.getElementById("paperInfo");
					qtype1.innerHTML = item;

				}
				// 多选题
				if (qType == 2) {
					item += `
					<div class="qtype2 qtype">
						<div class="layui-form-item">
							<span>${qNumber}</span>
							${content}
						</div>
						<div class="ans">
							<span>正确答案：</span>
							<span class="qans">${answer}</span>
							<div>
									<span>题目解析：</span>
									<i class="layui-icon layui-icon-survey" title="${description}"></i>
							</div>   
						</div>
						<div class="rate">
							<span>正确率：${cRate}</span>
						</div>
						<div class="kind">
							<span>题目标签：${kind}</span>
						</div>
					</div>
          `
					var qtype2 = document.getElementById("paperInfo");
					qtype2.innerHTML = item;
				}
				// 填空题
				if (qType == 0) {
					item += `
					<div class="qtype3">
						<div class="layui-form-item">
							<div class="ques">
								<span>${qNumber}</span>
								${content}
							</div>
							<div class="quesInpu">${data.answerList[i].answer}</div>
							<div class="ans">
								<span>正确答案：</span>
								<span class="qans">${answer}</span>
								<div>
									<span>题目解析：</span>
									<i class="layui-icon layui-icon-survey" title="${description}"></i>
								</div>   
							</div>
							<div class="rate">
								<span>正确率：${cRate}</span>
							</div>
							<div class="kind">
								<span>题目标签：${kind}</span>  
							</div>
						</div>
					</div>
          `
					var qtype3 = document.getElementById("paperInfo");
					qtype3.innerHTML = item;
				}
				// 主观题
				if (qType == 3) {
					item += `
					<div class="qtype4">
						<div class="layui-form-item layui-form-text">
							<div class="ques"><span>${qNumber}</span>${content}</div>
							<div class="">
								<textarea name="desc" class="layui-textarea"
									disabled>${data.answerList[i].answer}</textarea>
							</div>
							<div class="ans">
								<span>正确答案：</span>
								<span class="qans">${answer}</span>
								<div>
									<span>题目解析：</span>
									<i class="layui-icon layui-icon-survey" title="${description}"></i>
								</div>   
							</div>
							<div class="rate">
								<span>正确率：${cRate}</span>
							</div>
							<div class="kind">
								<span>题目标签：${kind}</span>
							</div>
						</div>
					</div>
          `
					var qtype4 = document.getElementById("paperInfo");
					qtype4.innerHTML = item;
				}
			}
		},
		error: function() {}
	})
})
