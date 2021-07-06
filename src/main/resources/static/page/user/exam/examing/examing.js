// 获取url参数
function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}
var Request = new Object();
Request = GetRequest();
var paperId;
var userId;
userId = Request['id'];
paperId = Request['paperId'];

$(document).ready(function() {
	var authorization = localStorage.getItem("authorization");
	console.log(authorization)
	var str = "";
	var item = "";
	// var paperId = 2;
	// var paperId = location.search.slice(4)

	var data = {
		paperId: paperId
	}
	var list = [];
	var arr3 = [];
	// console.log(data)
	$.ajax({
		url: "http://123.56.29.67/hengzhi-official/studentTest/test",
		anyce: false,
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		headers: {
			'Authorization': authorization
		},
		data: JSON.stringify(data),
		success: function(data) {
			console.log(data);
			// console.log(data.paperInfo)
			var beginTime = data.paperInfo.beginTime;
			arr3.push(beginTime);
			var deadline = data.paperInfo.deadline;
			var description = data.paperInfo.desciption;
			var name = data.paperInfo.name;
			var paperName = data.paperInfo.paperName;
			var score = data.paperInfo.score;
			var str = ""
			var item = ""
			var bTime = beginTime.slice(11)
			var dline = deadline.slice(11)
			str = `
          <div data-name=${name} class="paperName">
            ${name}
          </div>
          <div class="beginTime">
            ${bTime}——<span>${dline}</span>
			<span id="dline" style="display: none;">${deadline}</span>
          </div>
          <div data-score=${score} class="score">
            总分：${score}
          </div>
          <div id="test"></div>
        `
			var info = document.getElementsByClassName("info")[0];
			info.innerHTML = str;
			// console.log(data.qList[0])

			var item2 = `
        <div class="layui-form-item btnn">
          <div>
            <button id="frmbtn" class="layui-btn" lay-submit lay-filter="formDemo" onclick="submit()">立即提交</button>
            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
          </div>
        </div>
        `
			for (var i = 0; i < data.qList.length; i++) {
				var qNumber = data.qList[i].qNumber;
				var content = data.qList[i].content;
				var qType = data.qList[i].qType;
				// var data_length = data.qList.length;

				// 单选题
				if (qType == 1) {

					var arr1 = content.slice(1, content.length - 1).split(",");
					var options = arr1.length;

					item += `
          <div class="qtype1 qtype">
            <div class="layui-form-item ">          
								<div class="ques"><span>${qNumber}</span>（单选题）${arr1[0]}</div>
          `

					for (var j = 1; j < options; j++) {
						var dax = String.fromCharCode(64 + j)
						// console.log(arr1[j])
						item += `					
							<div><input type="radio" name="q${qNumber}" value="${arr1[j]}" title="${dax}.${arr1[1]}"></div>
						`
					}

					item += `
						</div>
					</div>
					`

					var qtype1 = document.getElementById("paperC");
					qtype1.innerHTML = item;
					// console.log(item)

					list.push("qtype1");

				}
				// 多选题
				if (qType == 2) {

					var arr1 = content.slice(1, content.length - 1).split(",");
					var options = arr1.length

					// item += `
					// <div class="qtype2 qtype">
					//   <div class="layui-form-item">
					//     <span>${qNumber}</span>
					//     <div class="ques">（多选题）${arr1[0]}</div>
					// 			<div class="choice"></div>
					//   </div>
					// </div>
					// `

					item += `
          <div class="qtype2 qtype">
            <div class="layui-form-item ">          
								<div class="ques"><span>${qNumber}</span>（多选题）${arr1[0]}</div>
								<div class="choice">
          `

					for (var j = 1; j < options; j++) {
						var dax = String.fromCharCode(64 + j)
						console.log(arr1[j])
						item += `					
							<div><input type="checkbox" name="q${qNumber}" value="${arr1[j]}" title="${dax}.${arr1[j]}" lay-skin="primary"></div>
						`
					}

					item += `
							</div>
						</div>
					</div>
					`

					var qtype2 = document.getElementById("paperC");
					qtype2.innerHTML = item;

					list.push("qtype2");

				}
				// 填空题
				if (qType == 0) {
					item += `
            <div  class="qtype3 qtype">
              <div class="layui-form-item">
                <div class="ques">
                  <span>${qNumber}.</span>${content}
                </div>
                <div class="quesInpu">
                  <input class="quesInpu1" type="text" value="">
                </div>
              </div>
            </div>
          `
					var qtype3 = document.getElementById("paperC")
					qtype3.innerHTML = item;

					list.push("qtype3");

				}
				// 主观题
				if (qType == 3) {
					item += `
            <div class="qtype4 qtype">
              <div class="layui-form-item layui-form-text">
                <div class="ques"><span>${qNumber}</span>${content}</div>
                <div class="">
                  <textarea class="quesinpu2" name="desc" placeholder="请输入内容" class="layui-textarea"></textarea>
                </div>
              </div>
            </div>
          `
					var qtype4 = document.getElementById("paperC")
					qtype4.innerHTML = item;

					list.push("qtype4");
				}

				layui.use('form', function() {
					var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
					form.render();
				});
			}

			// 倒计时
			function showNum(num) {
				if (num < 10) {
					return '0' + num
				}
				return num
			}
			layui.use('util', function() {
				var util = layui.util;
				// var endTime = document.getElementById("dline").innerHTML;
				var endTime = deadline;
				var serverTime = new Date().getTime(); //假设为当前服务器时间，这里采用的是本地时间，实际使用一般是取服务端的

				util.countdown(endTime, serverTime, function(date, serverTime, timer) {
					var data1 = showNum(date[1])
					var data2 = showNum(date[2])
					var data3 = showNum(date[3])
					var str = data1 + ' : ' + data2 + ' : ' + data3;
					if (str == 0) {
						$("#frmbtn").submit();
						// window.clearInterval(timeObj);
						layer.msg("时间到，已自动提交试卷")
					}
					layui.$('#test').html(str);
				});
			});

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		}

	});

	// 点击提交试卷
	submit = function() {
		var authorization = localStorage.getItem("authorization");
		var str = "";
		var item = "";

		var beginTime = parseInt(arr3[0])
		
		var answerList = [];
		for (var i = 0; i < 5; i++) {
			if (list[i] == "qtype1") {
				ans1 = $('input:radio[class="qtype1"]:checked').val();
				var answerLista = {
					"answer": ans1,
					"qNumber": i
				}
				answerList.push(answerLista)
			}
			if (list[i] == "qtype2") {
				ans2 = $('input:checkbox[class="qtype2"]:checked').val();
				var answerListb = {
					"answer": ans2,
					"qNumber": i
				}
				answerList.push(answerListb)

			}
			if (list[i] == "qtype3") {
				ans3 = $('.quesInpu1').val();
				var answerListc = {
					"answer": ans3,
					"qNumber": i
				}
				answerList.push(answerListc)
			}
			if (list[i] == "qtype4") {
				ans4 = $('.quesinpu2').val();
				var answerListd = {
					"answer": ans4,
					"qNumber": i
				}
				answerList.push(answerListd)
			}
		}
		var data = {
			userId: userId,
			beginTime: beginTime,
			paperId: paperId,
			answerList: answerList
		}
		console.log(data)
		$.ajax({
			url: "http://123.56.29.67/hengzhi-official/studentTest/submitPaper",
			anyce: false,
			type: "POST",
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			headers: {
				'Authorization': authorization
			},
			data: JSON.stringify(data),
			success: function(data) {
				// console.log(data);
				if(msg == "success"){
					layer.msg("提交试卷成功")
					// window.location.href = "../../notice/notice.html";
				}
				else{
					layer.msg("提交试卷失败")
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest.status);
				alert(XMLHttpRequest.readyState);
				alert(textStatus);
			}
		})
	}

	// 倒计时为0自动提交试卷

})
