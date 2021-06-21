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
										window.location.href = "../staffInfo/staffInfo.html";
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
	var data = {
		page: 1,
		size: 5
	}
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/super/findList',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(data),
		headers: {
			'Authorization': authorization
		},
		success: function(data) {
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
			var str = "";
			for (var i = 0; i < data.list.length; i++) {
				str += `
         <tr>
         	<td>${data.list[i].userId}</td>
         	<td>${data.list[i].name}</td>
         	<td>${data.list[i].studentId}</td>
         	<td>${data.list[i].role}</td>
         	<td><button class="layui-btn layui-btn-sm" data-id="${data.list[i].userId}" onclick="nono(this)">驳回</button><button class="layui-btn layui-btn-sm" data-id="${data.list[i].userId}"  onclick="yesyes(this)">通过</button></td>
         </tr>
        `
			}
			var boxinfo = document.getElementById("boxinfo")
			boxinfo.innerHTML = str;
		},
		error: function() {}
	})
})

function nono(e) {
	data = {
		userId: e.dataset.id
	}
	var authorization = localStorage.getItem("authorization");
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/super/rejectAdmit',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		headers: {
			'Authorization': authorization
		},
		data: JSON.stringify(data),
		success: function(data) {
			if (data.msg == "success") {
				layer.msg("成功驳回申请")
				var res = {
					page: 1,
					size: 5
				}
				$.ajax({
					type: 'post',
					url: 'http://123.56.29.67/hengzhi-official/super/findList',
					dataType: 'json',
					contentType: 'application/json;charset=utf-8',
					data: JSON.stringify(res),
					headers: {
						'Authorization': authorization
					},
					success: function(data) {
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
						var str = "";
						for (var i = 0; i < data.list.length; i++) {
							str += `
				 <tr>
				 	<td>${data.list[i].userId}</td>
				 	<td>${data.list[i].name}</td>
				 	<td>${data.list[i].studentId}</td>
				 	<td>${data.list[i].role}</td>
				 	<td><button class="layui-btn layui-btn-sm" data-id="${data.list[i].userId}" onclick="nono(this)">驳回</button><button class="layui-btn layui-btn-sm" data-id="${data.list[i].userId}" onclick="yesyes(this)">通过</button></td>
				 </tr>
				`
						}
						var boxinfo = document.getElementById("boxinfo")
						boxinfo.innerHTML = str;
					},
					error: function() {}
				})
			} else {
				layer.msg("驳回申请失败")
			}
		},
		error: function() {}
	});
}

function yesyes(e) {
	data = {
		userId: e.dataset.id
	}
	var authorization = localStorage.getItem("authorization");
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/super/throughAdmit',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		headers: {
			'Authorization': authorization
		},
		data: JSON.stringify(data),
		success: function(data) {
			if (data.msg == "success") {
				layer.msg("成功通过申请")
				var res = {
					page: 1,
					size: 5
				}
				$.ajax({
					type: 'post',
					url: 'http://123.56.29.67/hengzhi-official/super/findList',
					dataType: 'json',
					contentType: 'application/json;charset=utf-8',
					data: JSON.stringify(res),
					headers: {
						'Authorization': authorization
					},
					success: function(data) {
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
						var str = "";
						for (var i = 0; i < data.list.length; i++) {
							str += `
         <tr>
         	<td>${data.list[i].userId}</td>
         	<td>${data.list[i].name}</td>
         	<td>${data.list[i].studentId}</td>
         	<td>${data.list[i].role}</td>
         	<td><button class="layui-btn layui-btn-sm" data-id="${data.list[i].userId}" onclick="nono(this)">驳回</button><button class="layui-btn layui-btn-sm" data-id="${data.list[i].userId}" onclick="yesyes(this)">通过</button></td>
         </tr>
        `
						}
						var boxinfo = document.getElementById("boxinfo")
						boxinfo.innerHTML = str;
					},
					error: function() {}
				})
			} else(
				layer.msg("通过申请失败"))

		},
		error: function() {}
	});
}

function firstPage() {
	var authorization = localStorage.getItem("authorization");
	var data = {
		page: 1,
		size: 5
	}
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/super/findList',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(data),
		headers: {
			'Authorization': authorization
		},
		success: function(data) {
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
			var str = "";
			for (var i = 0; i < data.list.length; i++) {
				str += `
	     <tr>
	     	<td>${data.list[i].userId}</td>
	     	<td>${data.list[i].name}</td>
	     	<td>${data.list[i].studentId}</td>
	     	<td>${data.list[i].role}</td>
	     	<td><button class="layui-btn layui-btn-sm" data-id="${data.list[i].userId}" onclick="nono(this)">驳回</button><button class="layui-btn layui-btn-sm" data-id="${data.list[i].userId}"  onclick="yesyes(this)">通过</button></td>
	     </tr>
	    `
			}
			var boxinfo = document.getElementById("boxinfo")
			boxinfo.innerHTML = str;
		},
		error: function() {}
	})
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
			url: 'http://123.56.29.67/hengzhi-official/super/findList',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			data: JSON.stringify(data),
			headers: {
				'Authorization': authorization
			},
			success: function(data) {
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
				var str = "";
				for (var i = 0; i < data.list.length; i++) {
					str += `
		     <tr>
		     	<td>${data.list[i].userId}</td>
		     	<td>${data.list[i].name}</td>
		     	<td>${data.list[i].studentId}</td>
		     	<td>${data.list[i].role}</td>
		     	<td><button class="layui-btn layui-btn-sm" data-id="${data.list[i].userId}" onclick="nono(this)">驳回</button><button class="layui-btn layui-btn-sm" data-id="${data.list[i].userId}"  onclick="yesyes(this)">通过</button></td>
		     </tr>
		    `
				}
				var boxinfo = document.getElementById("boxinfo")
				boxinfo.innerHTML = str;
			},
			error: function() {}
		})
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
			url: 'http://123.56.29.67/hengzhi-official/super/findList',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			data: JSON.stringify(data),
			headers: {
				'Authorization': authorization
			},
			success: function(data) {
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
				var str = "";
				for (var i = 0; i < data.list.length; i++) {
					str += `
		     <tr>
		     	<td>${data.list[i].userId}</td>
		     	<td>${data.list[i].name}</td>
		     	<td>${data.list[i].studentId}</td>
		     	<td>${data.list[i].role}</td>
		     	<td><button class="layui-btn layui-btn-sm" data-id="${data.list[i].userId}" onclick="nono(this)">驳回</button><button class="layui-btn layui-btn-sm" data-id="${data.list[i].userId}"  onclick="yesyes(this)">通过</button></td>
		     </tr>
		    `
				}
				var boxinfo = document.getElementById("boxinfo")
				boxinfo.innerHTML = str;
			},
			error: function() {}
		})
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
		url: 'http://123.56.29.67/hengzhi-official/super/findList',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(data),
		headers: {
			'Authorization': authorization
		},
		success: function(data) {
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
			var str = "";
			for (var i = 0; i < data.list.length; i++) {
				str += `
	     <tr>
	     	<td>${data.list[i].userId}</td>
	     	<td>${data.list[i].name}</td>
	     	<td>${data.list[i].studentId}</td>
	     	<td>${data.list[i].role}</td>
	     	<td><button class="layui-btn layui-btn-sm" data-id="${data.list[i].userId}" onclick="nono(this)">驳回</button><button class="layui-btn layui-btn-sm" data-id="${data.list[i].userId}"  onclick="yesyes(this)">通过</button></td>
	     </tr>
	    `
			}
			var boxinfo = document.getElementById("boxinfo")
			boxinfo.innerHTML = str;
		},
		error: function() {}
	})
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
		$.ajax({
			type: 'post',
			url: 'http://123.56.29.67/hengzhi-official/super/findList',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			data: JSON.stringify(data),
			headers: {
				'Authorization': authorization
			},
			success: function(data) {
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
				var str = "";
				for (var i = 0; i < data.list.length; i++) {
					str += `
		         <tr>
		         	<td>${data.list[i].userId}</td>
		         	<td>${data.list[i].name}</td>
		         	<td>${data.list[i].studentId}</td>
		         	<td>${data.list[i].role}</td>
		         	<td><button class="layui-btn layui-btn-sm" data-id="${data.list[i].userId}" onclick="nono(this)">驳回</button><button class="layui-btn layui-btn-sm" data-id="${data.list[i].userId}"  onclick="yesyes(this)">通过</button></td>
		         </tr>
		        `
				}
				var boxinfo = document.getElementById("boxinfo")
				boxinfo.innerHTML = str;
			},
			error: function() {}
		})
	} else {
		layer.msg("请输入合法数字")
	}
}
