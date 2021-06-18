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
$(document).ready(function(){
  var authorization = localStorage.getItem("authorization");
	console.log(authorization);
  //url带参数
  var paperId = 3;
  var paperName = "恒之第一次测试";
  var str = "";
  var data = {
		page: 1,
		size: 5,
    paperId: paperId
	}
  console.log(data);
  $.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/managerPaper/scoreInformation',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(data),
		headers: {
			'Authorization': authorization
		},
		success: function(data) {
      console.log(data);
      // console.log(average);
      // var item = "";
      // item = `
      //   <span>本套试卷的的平均成绩为${average}</span>
      // `
      // var ave = document.getElementsByClassName("aver")
			// ave.innerHTML = item;
      // console.log(ave.innerHTML);
      for(var i = 0; i < data.list.length; i++){
        // console.log(i)
        var score = data.list[i].score;
        var userId = data.list[i].userId;  
        var name = data.list[i].userScoreInformationList[0].name;
        var studentId = data.list[i].userScoreInformationList[0].studentId;
          // console.log(data.list[i].userScoreInformationList[0].name)
          // console.log(data.list[1].userScoreInformationList[0].name)
        str += `
          <tr>
            <td>${userId}</td>
            <td>${studentId}</td>
            <td>${name}</td>
            <td>${score}</td>
            <td>${data.average}</td>
            <td><a class="layui-btn layui-btn-xs" lay-event="edit">查看试卷</a></td>
          </tr>
        `
        var boxinfo = document.getElementById("boxinfo")
        boxinfo.innerHTML = str;
      }

		},
		error: function() {}
	})
})