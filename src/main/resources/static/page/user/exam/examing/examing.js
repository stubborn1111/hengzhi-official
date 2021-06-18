$(document).ready(function () {
  var authorization = localStorage.getItem("authorization");
  console.log(authorization)
  var str = "";
  var item = "";
  var paperId = 2;
  var data = {
    paperId: paperId
  }
  var list = [];
  var arr = [];
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
    success: function (data) {
      console.log(data);
      // console.log(data.paperInfo)
        var beginTime = data.paperInfo.beginTime;
        arr.push(beginTime);
        // console.log(beginTime)
        var deadline = data.paperInfo.beginTime;
        var description = data.paperInfo.desciption;
        var name = data.paperInfo.name;
        var paperName = data.paperInfo.paperName;
        var score = data.paperInfo.score;
        var str = ""
        var item = ""
        str=`
          <div data-name=${name} class="paperName">
            ${name}
          </div>
          <div data-beginTime=${beginTime} class="beginTime">
            ${beginTime}——${deadline}
          </div>
          <div data-score=${score} class="score">
            总分：${score}
          </div>
          <div id="test"></div>
        `
        var info = document.getElementsByClassName("info")[0];
        info.innerHTML = str;
        console.log(data.qList[0])

        var item2 = `
        <div class="layui-form-item btnn">
          <div>
            <button id="frmbtn" class="layui-btn" lay-submit lay-filter="formDemo" onclick="submit()">立即提交</button>
            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
          </div>
        </div>
        `
      for (var i = 0; i < data.qList.length; i++) {
        // console.log(data.qList[i])
        var qNumber = data.qList[i].qNumber;
        var content = data.qList[i].content;
        var qType = data.qList[i].qType;
        var data_length = data.qList.length;
        // console.log(data_length)
        // 单选题
        if (qType == 1) {

          item += `
          <div class="qtype1 qtype">
            <div class="layui-form-item">
              <div class="ques"><span>${qNumber}</span>
                ${content}
            </div>
          </div>
          `
          var qtype1 = document.getElementById("paperC");
          qtype1.innerHTML = item;

          // console.log(qtype1.innerHTML)

          list.push("qtype1");

          // $(".qtype1")[0].innerHTML = content;
        }
        // 多选题
        if (qType == 2) {
          // $(".qtype2")[0].innerHTML = content;
          item += `
          <div class="qtype2 qtype">
            <div class="layui-form-item">
              <div class="ques"><span>${qNumber}</span>
                ${content}
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
      }
      
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert(XMLHttpRequest.status);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      alert(XMLHttpRequest.readyState);
      alert(textStatus);
    }
  });

  // 点击提交试卷
  submit = function() {
    var authorization = localStorage.getItem("authorization");
    console.log(authorization)
    console.log(list)
    var str = "";
    var item = "";
    var paperId = 2;
    // 获取完成时间
    var myDate = new Date();
    var mytime=myDate.toLocaleTimeString(); 
    var arrcur =parseInt(mytime)  
    // console.log(mytime);
    console.log(arr[0])
    var arrpre = arr[0];
    var answerTime = arrcur - arrpre;
    // console.log(answerTime)
    // 获取答案列表
    var answerTime = 40;
    var userId = 3;
    var answerList = [];
    for (var i = 0; i < 5; i++) { 
      if(list[i] == "qtype1"){
        ans1 = $('input:radio[class="qtype1"]:checked').val();
        var answerLista ={
          "answer": ans1,
          "qNumber": i
        }
        answerList.push(answerLista)
      }
      if(list[i] == "qtype2"){
        ans2 = $('input:radio[class="qtype2"]:checked').val();
        var answerListb ={
          "answer": ans2,
          "qNumber": i
        }
        answerList.push(answerListb)

      }
      if(list[i] == "qtype3"){
        ans3 = $('.quesInpu1').val();
        var answerListc ={
          "answer": ans3,
          "qNumber": i
        }
        answerList.push(answerListc)
      }
      if(list[i] == "qtype4"){
        ans4 = $('.quesinpu2').val();
        var answerListd ={
          "answer": ans4,
          "qNumber": i
        }
        answerList.push(answerListd)
      }
    }
    var data = {
      userId: userId,
      answerTime: answerTime,
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
      success: function (data) {
        // console.log(data);
        window.location.href = "../preList/preList.html";
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(XMLHttpRequest.status);
        alert(XMLHttpRequest.readyState);
        alert(textStatus);
      }
    })
  }

  // 倒计时为0自动提交试卷

})