$(document).ready(function() {
	var authorization = localStorage.getItem("authorization");
	data = {
		paperId: 2,
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

function check() {
	var authorization = localStorage.getItem("authorization");
	var listLength = $('.scoreList').length
	var list = []
	var flag = true
	for (var i = 0; i < listLength; i++) {
		var score = document.getElementsByClassName("scoreList")[i].value
		var qn = document.getElementsByClassName("scoreList")[i]
		var score1 = qn.dataset.score
		var qn1 = qn.dataset.qn
		if (score < score1) {
			flag = false
		}
		var lista = {
			"qNumber": qn1,
			"score": score
		}
		list.push(lista);
	}
	if (flag = true) {
		data = {
			paperId: 2,
			page: 1
		}
		$.ajax({
			type: 'post',
			url: 'http://123.56.29.67/hengzhi-official/managerPaper/selectNewsFront',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			headers: {
				'Authorization': authorization
			},
			data: JSON.stringify(data),
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

	}
	if (flag = false) {
		list = []
	}
}
