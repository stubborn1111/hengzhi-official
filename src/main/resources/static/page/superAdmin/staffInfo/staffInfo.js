$(document).ready(function() {
	var authorization = localStorage.getItem("authorization");
	var data = {
		page: 1,
		size: 5
	}
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/super/showAllUser',
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
				var headImg = data.list[i].headImg;
				var name = data.list[i].name;
				var userId = data.list[i].userId;
				var studentId = data.list[i].studentId;
				var power = data.list[i].power;
				if (data.list[i].power == "user") {
					str += `
					  <tr>
					    <td>${userId}</td>
					    <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
					    <td>${name}</td>
					    <td>${studentId}</td>
					    <td>${power}</td>
					    <td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="appoint(this)">任命为管理员</button></td>
						<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancel(this)">删除此用户</button></td>
					  </tr>
					`
				}
				if (data.list[i].power == "admin") {
					str += `
          <tr>
            <td>${userId}</td>
            <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
            <td>${name}</td>
            <td>${studentId}</td>
            <td>${power}</td>
            <td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancelApp(this)">取消任命</button></td>
			<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancel(this)">删除此用户</button></td>
          </tr>
        `
				}
				if (data.list[i].power == "super") {
					str += `
					  <tr>
					    <td>${userId}</td>
					    <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
					    <td>${name}</td>
					    <td>${studentId}</td>
					    <td>${power}</td>
					    <td><button class="layui-btn layui-btn-sm layui-btn-disabled" style="background-color: white!important; color:#9e9e9e !important" data-id="${userId}">取消任命</button></td>
						<td><button class="layui-btn layui-btn-sm layui-btn-disabled" data-id="${userId}" style="background-color: white!important; color:#9e9e9e !important">删除此用户</button></td>
					  </tr>
					`
				}
			}
			var boxinfo = document.getElementById("boxinfo")
			boxinfo.innerHTML = str;
		},
		error: function() {}
	})
})
// 取消任命
function cancelApp(e) {
	data = {
		userId: e.dataset.id
	}
	var authorization = localStorage.getItem("authorization");
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/super/deleteAdmin',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		headers: {
			'Authorization': authorization
		},
		data: JSON.stringify(data),
		success: function(data) {
			if (data.msg == "success") {
				layer.msg("操作成功")
				res = {
					page: 1,
					size: 5
				}
				$.ajax({
					type: 'post',
					url: 'http://123.56.29.67/hengzhi-official/super/showAllUser',
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
							var headImg = data.list[i].headImg;
							var name = data.list[i].name;
							var userId = data.list[i].userId;
							var studentId = data.list[i].studentId;
							var power = data.list[i].power;
							if (data.list[i].power == "user") {
								str += `
								<tr>
									<td>${userId}</td>
									<td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
									<td>${name}</td>
									<td>${studentId}</td>
									<td>${power}</td>
									<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="appoint(this)">任命为管理员</button></td>
									<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancel(this)">删除此用户</button></td>
								</tr>
								`
							}
							if (data.list[i].power == "admin") {
								str += `
								<tr>
									<td>${userId}</td>
									<td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
									<td>${name}</td>
									<td>${studentId}</td>
									<td>${power}</td>
									<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancelApp(this)">取消任命</button></td>
									<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancel(this)">删除此用户</button></td>
								</tr>
								`
							}
							if (data.list[i].power == "super") {
								str += `
								<tr>
									<td>${userId}</td>
									<td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
									<td>${name}</td>
									<td>${studentId}</td>
									<td>${power}</td>
									<td><button class="layui-btn layui-btn-sm layui-btn-disabled" style="background-color: white!important; color:#9e9e9e !important" data-id="${userId}">取消任命</button></td>
								<td><button class="layui-btn layui-btn-sm layui-btn-disabled" data-id="${userId}" style="background-color: white!important; color:#9e9e9e !important">删除此用户</button></td>
								</tr>
								`
							}
						}
						var boxinfo = document.getElementById("boxinfo")
						boxinfo.innerHTML = str;
					},
					error: function() {}
				})
			} else {
				layer.msg("操作失败")
			}
		},
		error: function() {}
	});

}
//任命管理员
function appoint(e) {
	data = {
		userId: e.dataset.id
	}
	var authorization = localStorage.getItem("authorization");
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/super/addAdmin',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		headers: {
			'Authorization': authorization
		},
		data: JSON.stringify(data),
		success: function(data) {
			if (data.msg == "success") {
				layer.msg("任命成功")
				res = {
					page: 1,
					size: 5
				}
				$.ajax({
					type: 'post',
					url: 'http://123.56.29.67/hengzhi-official/super/showAllUser',
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
							var headImg = data.list[i].headImg;
							var name = data.list[i].name;
							var userId = data.list[i].userId;
							var studentId = data.list[i].studentId;
							var power = data.list[i].power;
							if (data.list[i].power == "user") {
								str += `
					  <tr>
					    <td>${userId}</td>
					    <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
					    <td>${name}</td>
					    <td>${studentId}</td>
					    <td>${power}</td>
					    <td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="appoint(this)">任命为管理员</button></td>
						<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancel(this)">删除此用户</button></td>
					  </tr>
					`
							}
							if (data.list[i].power == "admin") {
								str += `
	      <tr>
	        <td>${userId}</td>
	        <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
	        <td>${name}</td>
	        <td>${studentId}</td>
	        <td>${power}</td>
	        <td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancelApp(this)">取消任命</button></td>
			<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancel(this)">删除此用户</button></td>
	      </tr>
	    `
							}
							if (data.list[i].power == "super") {
								str += `
					  <tr>
					    <td>${userId}</td>
					    <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
					    <td>${name}</td>
					    <td>${studentId}</td>
					    <td>${power}</td>
					    <td><button class="layui-btn layui-btn-sm layui-btn-disabled" style="background-color: white!important; color:#9e9e9e !important" data-id="${userId}">取消任命</button></td>
						<td><button class="layui-btn layui-btn-sm layui-btn-disabled" data-id="${userId}" style="background-color: white!important; color:#9e9e9e !important">删除此用户</button></td>
					  </tr>
					`
							}
						}
						var boxinfo = document.getElementById("boxinfo")
						boxinfo.innerHTML = str;
					},
					error: function() {}
				})
			} else {
				layer.msg("任命失败")
			}
		},
		error: function() {}
	});

}
//删除用户
function cancel(e) {
	data = {
		userId: e.dataset.id
	}
	var authorization = localStorage.getItem("authorization");
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/super/deleteUser',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		headers: {
			'Authorization': authorization
		},
		data: JSON.stringify(data),
		success: function(data) {
			if (data.msg == "success") {
				layer.msg("删除成功")
				res = {
					page: 1,
					size: 5
				}
				$.ajax({
					type: 'post',
					url: 'http://123.56.29.67/hengzhi-official/super/showAllUser',
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
							var headImg = data.list[i].headImg;
							var name = data.list[i].name;
							var userId = data.list[i].userId;
							var studentId = data.list[i].studentId;
							var power = data.list[i].power;
							if (data.list[i].power == "user") {
								str += `
					  <tr>
					    <td>${userId}</td>
					    <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
					    <td>${name}</td>
					    <td>${studentId}</td>
					    <td>${power}</td>
					    <td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="appoint(this)">任命为管理员</button></td>
						<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancel(this)">删除此用户</button></td>
					  </tr>
					`
							}
							if (data.list[i].power == "admin") {
								str += `
	      <tr>
	        <td>${userId}</td>
	        <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
	        <td>${name}</td>
	        <td>${studentId}</td>
	        <td>${power}</td>
	        <td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancelApp(this)">取消任命</button></td>
			<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancel(this)">删除此用户</button></td>
	      </tr>
	    `
							}
							if (data.list[i].power == "super") {
								str += `
					  <tr>
					    <td>${userId}</td>
					    <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
					    <td>${name}</td>
					    <td>${studentId}</td>
					    <td>${power}</td>
					    <td><button class="layui-btn layui-btn-sm layui-btn-disabled" style="background-color: white!important; color:#9e9e9e !important" data-id="${userId}">取消任命</button></td>
						<td><button class="layui-btn layui-btn-sm layui-btn-disabled" data-id="${userId}" style="background-color: white!important; color:#9e9e9e !important">删除此用户</button></td>
					  </tr>
					`
							}
						}
						var boxinfo = document.getElementById("boxinfo")
						boxinfo.innerHTML = str;
					},
					error: function() {}
				})
			} else {
				layer.msg("删除失败")
			}
		},
		error: function() {}
	});

}
//分页
function firstPage() {
	var authorization = localStorage.getItem("authorization");
	var data = {
		page: 1,
		size: 5
	}
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/super/showAllUser',
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
				var headImg = data.list[i].headImg;
				var name = data.list[i].name;
				var userId = data.list[i].userId;
				var studentId = data.list[i].studentId;
				var power = data.list[i].power;
				if (data.list[i].power == "user") {
					str += `
					  <tr>
					    <td>${userId}</td>
					    <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
					    <td>${name}</td>
					    <td>${studentId}</td>
					    <td>${power}</td>
					    <td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="appoint(this)">任命为管理员</button></td>
						<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancel(this)">删除此用户</button></td>
					  </tr>
					`
				}
				if (data.list[i].power == "admin") {
					str += `
	      <tr>
	        <td>${userId}</td>
	        <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
	        <td>${name}</td>
	        <td>${studentId}</td>
	        <td>${power}</td>
	        <td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancelApp(this)">取消任命</button></td>
			<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancel(this)">删除此用户</button></td>
	      </tr>
	    `
				}
				if (data.list[i].power == "super") {
					str += `
					  <tr>
					    <td>${userId}</td>
					    <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
					    <td>${name}</td>
					    <td>${studentId}</td>
					    <td>${power}</td>
					    <td><button class="layui-btn layui-btn-sm layui-btn-disabled" style="background-color: white!important; color:#9e9e9e !important" data-id="${userId}">取消任命</button></td>
						<td><button class="layui-btn layui-btn-sm layui-btn-disabled" data-id="${userId}" style="background-color: white!important; color:#9e9e9e !important">删除此用户</button></td>
					  </tr>
					`
				}
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
			url: 'http://123.56.29.67/hengzhi-official/super/showAllUser',
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
					var headImg = data.list[i].headImg;
					var name = data.list[i].name;
					var userId = data.list[i].userId;
					var studentId = data.list[i].studentId;
					var power = data.list[i].power;
					if (data.list[i].power == "user") {
						str += `
							  <tr>
							    <td>${userId}</td>
							    <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
							    <td>${name}</td>
							    <td>${studentId}</td>
							    <td>${power}</td>
							    <td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="appoint(this)">任命为管理员</button></td>
								<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancel(this)">删除此用户</button></td>
							  </tr>
							`
					}
					if (data.list[i].power == "admin") {
						str += `
		          <tr>
		            <td>${userId}</td>
		            <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
		            <td>${name}</td>
		            <td>${studentId}</td>
		            <td>${power}</td>
		            <td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancelApp(this)">取消任命</button></td>
					<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancel(this)">删除此用户</button></td>
		          </tr>
		        `
					}
					if (data.list[i].power == "super") {
						str += `
							  <tr>
							    <td>${userId}</td>
							    <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
							    <td>${name}</td>
							    <td>${studentId}</td>
							    <td>${power}</td>
							    <td><button class="layui-btn layui-btn-sm layui-btn-disabled" style="background-color: white!important; color:#9e9e9e !important" data-id="${userId}">取消任命</button></td>
								<td><button class="layui-btn layui-btn-sm layui-btn-disabled" data-id="${userId}" style="background-color: white!important; color:#9e9e9e !important">删除此用户</button></td>
							  </tr>
							`
					}
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
			url: 'http://123.56.29.67/hengzhi-official/super/showAllUser',
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
					var headImg = data.list[i].headImg;
					var name = data.list[i].name;
					var userId = data.list[i].userId;
					var studentId = data.list[i].studentId;
					var power = data.list[i].power;
					if (data.list[i].power == "user") {
						str += `
						  <tr>
						    <td>${userId}</td>
						    <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
						    <td>${name}</td>
						    <td>${studentId}</td>
						    <td>${power}</td>
						    <td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="appoint(this)">任命为管理员</button></td>
							<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancel(this)">删除此用户</button></td>
						  </tr>
						`
					}
					if (data.list[i].power == "admin") {
						str += `
	          <tr>
	            <td>${userId}</td>
	            <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
	            <td>${name}</td>
	            <td>${studentId}</td>
	            <td>${power}</td>
	            <td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancelApp(this)">取消任命</button></td>
				<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancel(this)">删除此用户</button></td>
	          </tr>
	        `
					}
					if (data.list[i].power == "super") {
						str += `
						  <tr>
						    <td>${userId}</td>
						    <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
						    <td>${name}</td>
						    <td>${studentId}</td>
						    <td>${power}</td>
						    <td><button class="layui-btn layui-btn-sm layui-btn-disabled" style="background-color: white!important; color:#9e9e9e !important" data-id="${userId}">取消任命</button></td>
							<td><button class="layui-btn layui-btn-sm layui-btn-disabled" data-id="${userId}" style="background-color: white!important; color:#9e9e9e !important">删除此用户</button></td>
						  </tr>
						`
					}
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
		url: 'http://123.56.29.67/hengzhi-official/super/showAllUser',
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
				var headImg = data.list[i].headImg;
				var name = data.list[i].name;
				var userId = data.list[i].userId;
				var studentId = data.list[i].studentId;
				var power = data.list[i].power;
				if (data.list[i].power == "user") {
					str += `
						  <tr>
						    <td>${userId}</td>
						    <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
						    <td>${name}</td>
						    <td>${studentId}</td>
						    <td>${power}</td>
						    <td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="appoint(this)">任命为管理员</button></td>
							<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancel(this)">删除此用户</button></td>
						  </tr>
						`
				}
				if (data.list[i].power == "admin") {
					str += `
	          <tr>
	            <td>${userId}</td>
	            <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
	            <td>${name}</td>
	            <td>${studentId}</td>
	            <td>${power}</td>
	            <td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancelApp(this)">取消任命</button></td>
				<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancel(this)">删除此用户</button></td>
	          </tr>
	        `
				}
				if (data.list[i].power == "super") {
					str += `
						  <tr>
						    <td>${userId}</td>
						    <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
						    <td>${name}</td>
						    <td>${studentId}</td>
						    <td>${power}</td>
						    <td><button class="layui-btn layui-btn-sm layui-btn-disabled" style="background-color: white!important; color:#9e9e9e !important" data-id="${userId}">取消任命</button></td>
							<td><button class="layui-btn layui-btn-sm layui-btn-disabled" data-id="${userId}" style="background-color: white!important; color:#9e9e9e !important">删除此用户</button></td>
						  </tr>
						`
				}
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
			url: 'http://123.56.29.67/hengzhi-official/super/showAllUser',
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
					var headImg = data.list[i].headImg;
					var name = data.list[i].name;
					var userId = data.list[i].userId;
					var studentId = data.list[i].studentId;
					var power = data.list[i].power;
					if (data.list[i].power == "user") {
						str += `
							  <tr>
							    <td>${userId}</td>
							    <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
							    <td>${name}</td>
							    <td>${studentId}</td>
							    <td>${power}</td>
							    <td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="appoint(this)">任命为管理员</button></td>
								<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancel(this)">删除此用户</button></td>
							  </tr>
							`
					}
					if (data.list[i].power == "admin") {
						str += `
		          <tr>
		            <td>${userId}</td>
		            <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
		            <td>${name}</td>
		            <td>${studentId}</td>
		            <td>${power}</td>
		            <td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancelApp(this)">取消任命</button></td>
					<td><button class="layui-btn layui-btn-sm" data-id="${userId}" onclick="cancel(this)">删除此用户</button></td>
		          </tr>
		        `
					}
					if (data.list[i].power == "super") {
						str += `
							  <tr>
							    <td>${userId}</td>
							    <td><img style="width: 45px;height: 45px;" src = "http://123.56.29.67/hengzhi-official/headImage/${headImg}"></td>
							    <td>${name}</td>
							    <td>${studentId}</td>
							    <td>${power}</td>
							    <td><button class="layui-btn layui-btn-sm layui-btn-disabled" style="background-color: white!important; color:#9e9e9e !important" data-id="${userId}">取消任命</button></td>
								<td><button class="layui-btn layui-btn-sm layui-btn-disabled" data-id="${userId}" style="background-color: white!important; color:#9e9e9e !important">删除此用户</button></td>
							  </tr>
							`
					}
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

function isNumber(value) {
	var patrn = /^(-)?\d+(\.\d+)?$/;
	if (patrn.exec(value) == null || value == "") {
		return false
	} else {
		return true
	}
}
// 添加人员
function addP() {
	layui.use('layer', function() {
		var $ = layui.jquery;
		var element = layui.element;
		var layer = layui.layer;
		var form = layui.form;
		layer.open({
			type: 1,
			title: '添加人员',
			area: ['350px', '250px'],
			shade: 0.4,
			content: $("#testadd"),
			btn: ['添加', '取消'],
			scrollbar: false,
			yes: function(index) {
				var studentId = document.getElementById("studentId").value
				var name = document.getElementById("namee").value
				console.log(studentId)
				console.log(name)
				if (!isNumber(studentId) || name.match(/^\s*$/) ||studentId.length!=10) {
					layer.msg("请输入有效信息")
				} else {
					var authorization = localStorage.getItem("authorization");
					data={
						studentId:studentId,
						name:name
					}
					$.ajax({
						type: 'post',
						url: 'http://123.56.29.67/hengzhi-official/super/addUser',
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
							if(data.msg=="exist"){
								layer.msg("已有此用户,添加失败")
							}
							layer.close(index);
						},
						error: function() {}
					});
				}

			},
			btn2: function() {
				layer.close(index);
				showToast();
			}
		});
	});
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
}
