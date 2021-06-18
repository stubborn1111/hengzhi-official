// 未考试列表
$(document).ready(function() {
	var authorization = localStorage.getItem("authorization");
	var data = {
		page: 1,
		size: 12
	}
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/managerPaper/selectUnFinish',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(data),
		headers: {
			'Authorization': authorization
		},
		success: function(data) {
			var box = ""
			for (var i = 0; i < data.list.length; i++) {
				var time = data.list[i].beginTime
				var time1 = time.slice(5, 7)
				var time2 = time.slice(8, 10)
				var time3 = time.slice(11, 16)
				var time4 = data.list[i].deadLine
				var time5 = time4.slice(11, 16)
				console.log(time1)
				box += `
							<div class="paperBox" data-id="${data.list[i].paperId}">
								<div>${data.list[i].paperName}</div>
								<div>${time1}.${time2}</div>
								<div>${time3}-${time5}</div>
								<div>码：${data.list[i].code}</div>
							</div>
							`
			}
			box += `<div class="clear"></div>`

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
			var divs = document.getElementById("divs")
			divs.innerHTML = box;
			console.log(data)
		},
		error: function() {}
	})
})

$(document).ready(function() {
	var authorization = localStorage.getItem("authorization");
	var data = {
		page: 1,
		size: 12
	}
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/managerPaper/selectUnFinish',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(data),
		headers: {
			'Authorization': authorization
		},
		success: function(data) {
			var box = ""
			for (var i = 0; i < data.list.length; i++) {
				var time = data.list[i].beginTime
				var time1 = time.slice(5, 7)
				var time2 = time.slice(8, 10)
				var time3 = time.slice(11, 16)
				var time4 = data.list[i].deadLine
				var time5 = time4.slice(11, 16)
				console.log(time1)
				box += `
							<div class="paperBox" data-id="${data.list[i].paperId}">
								<div>${data.list[i].paperName}</div>
								<div>${time1}.${time2}</div>
								<div>${time3}-${time5}</div>
								<div>码：${data.list[i].code}</div>
							</div>
							`
			}
			box += `<div class="clear"></div>`

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
			var divs = document.getElementById("divs")
			divs.innerHTML = box;
			console.log(data)
		},
		error: function() {}
	})
})

function firstPage() {
	var authorization = localStorage.getItem("authorization");
	var data = {
		page: 1,
		size: 12
	}
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/managerPaper/selectUnFinish',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(data),
		headers: {
			'Authorization': authorization
		},
		success: function(data) {
			var box = ""
			for (var i = 0; i < data.list.length; i++) {
				var time = data.list[i].beginTime
				var time1 = time.slice(5, 7)
				var time2 = time.slice(8, 10)
				var time3 = time.slice(11, 16)
				var time4 = data.list[i].deadLine
				var time5 = time4.slice(11, 16)
				console.log(time1)
				box += `
							<div class="paperBox" data-id="${data.list[i].paperId}">
								<div>${data.list[i].paperName}</div>
								<div>${time1}.${time2}</div>
								<div>${time3}-${time5}</div>
								<div>码：${data.list[i].code}</div>
							</div>
							`
			}
			box += `<div class="clear"></div>`

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
			var divs = document.getElementById("divs")
			divs.innerHTML = box;
			console.log(data)
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
			size: 12
		}
		$.ajax({
			type: 'post',
			url: 'http://123.56.29.67/hengzhi-official/managerPaper/selectUnFinish',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			data: JSON.stringify(data),
			headers: {
				'Authorization': authorization
			},
			success: function(data) {
				var box = ""
				for (var i = 0; i < data.list.length; i++) {
					var time = data.list[i].beginTime
					var time1 = time.slice(5, 7)
					var time2 = time.slice(8, 10)
					var time3 = time.slice(11, 16)
					var time4 = data.list[i].deadLine
					var time5 = time4.slice(11, 16)
					console.log(time1)
					box += `
								<div class="paperBox" data-id="${data.list[i].paperId}">
									<div>${data.list[i].paperName}</div>
									<div>${time1}.${time2}</div>
									<div>${time3}-${time5}</div>
									<div>码：${data.list[i].code}</div>
								</div>
								`
				}
				box += `<div class="clear"></div>`

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
				var divs = document.getElementById("divs")
				divs.innerHTML = box;
				console.log(data)
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
			size: 12
		}
		$.ajax({
			type: 'post',
			url: 'http://123.56.29.67/hengzhi-official/managerPaper/selectUnFinish',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			data: JSON.stringify(data),
			headers: {
				'Authorization': authorization
			},
			success: function(data) {
				var box = ""
				for (var i = 0; i < data.list.length; i++) {
					var time = data.list[i].beginTime
					var time1 = time.slice(5, 7)
					var time2 = time.slice(8, 10)
					var time3 = time.slice(11, 16)
					var time4 = data.list[i].deadLine
					var time5 = time4.slice(11, 16)
					console.log(time1)
					box += `
								<div class="paperBox" data-id="${data.list[i].paperId}">
									<div>${data.list[i].paperName}</div>
									<div>${time1}.${time2}</div>
									<div>${time3}-${time5}</div>
									<div>码：${data.list[i].code}</div>
								</div>
								`
				}
				box += `<div class="clear"></div>`

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
				var divs = document.getElementById("divs")
				divs.innerHTML = box;
				console.log(data)
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
		size: 12
	}
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/managerPaper/selectUnFinish',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(data),
		headers: {
			'Authorization': authorization
		},
		success: function(data) {
			var box = ""
			for (var i = 0; i < data.list.length; i++) {
				var time = data.list[i].beginTime
				var time1 = time.slice(5, 7)
				var time2 = time.slice(8, 10)
				var time3 = time.slice(11, 16)
				var time4 = data.list[i].deadLine
				var time5 = time4.slice(11, 16)
				console.log(time1)
				box += `
							<div class="paperBox" data-id="${data.list[i].paperId}">
								<div>${data.list[i].paperName}</div>
								<div>${time1}.${time2}</div>
								<div>${time3}-${time5}</div>
								<div>码：${data.list[i].code}</div>
							</div>
							`
			}
			box += `<div class="clear"></div>`

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
			var divs = document.getElementById("divs")
			divs.innerHTML = box;
			console.log(data)
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
			size: 12
		}
		console.log("cesh", data)
		$.ajax({
			type: 'post',
			url: 'http://123.56.29.67/hengzhi-official/managerPaper/selectUnFinish',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			data: JSON.stringify(data),
			headers: {
				'Authorization': authorization
			},
			success: function(data) {
				var box = ""
				for (var i = 0; i < data.list.length; i++) {
					var time = data.list[i].beginTime
					var time1 = time.slice(5, 7)
					var time2 = time.slice(8, 10)
					var time3 = time.slice(11, 16)
					var time4 = data.list[i].deadLine
					var time5 = time4.slice(11, 16)
					console.log(time1)
					box += `
								<div class="paperBox" data-id="${data.list[i].paperId}">
									<div>${data.list[i].paperName}</div>
									<div>${time1}.${time2}</div>
									<div>${time3}-${time5}</div>
									<div>码：${data.list[i].code}</div>
								</div>
								`
				}
				box += `<div class="clear"></div>`

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
				var divs = document.getElementById("divs")
				divs.innerHTML = box;
				console.log(data)
			},
			error: function() {}
		})
	} else {
		layer.msg("请输入合法数字")
	}
}
