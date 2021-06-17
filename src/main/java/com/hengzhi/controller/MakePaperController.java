package com.hengzhi.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.hengzhi.dto.ManagerPaper.QuestionAnswer1;
import com.hengzhi.dto.paperAndTest.QInfo;
import com.hengzhi.dto.paperAndTest.ShowQuestions;
import com.hengzhi.entity.Introduction;
import com.hengzhi.entity.Message;
import com.hengzhi.entity.Notice;
import com.hengzhi.entity.Questions;
import com.hengzhi.secutity.Security;
import com.hengzhi.service.JWTService;
import com.hengzhi.service.MakePaperService;
import com.hengzhi.service.ShowService;
import com.hengzhi.utils.Paging;
import com.hengzhi.utils.RandomCode;
import com.hengzhi.utils.StringToDate;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.ParseException;
import java.util.*;

@RequestMapping("/makePaper")
@Controller
@CrossOrigin(origins = "*",maxAge = 3600)
public class MakePaperController {
    @Autowired
    MakePaperService makePaperService;
    @Autowired
    JWTService jwtService;
//    增加题目
    @RequestMapping("/addQuestions")
    @ResponseBody
    @RequiresRoles(value = {"admin"})
    public Map addQuestions(@RequestBody JSONObject jsonObject,HttpServletRequest request){
        String type=jsonObject.getString("type");
        int userId=jwtService.getUserId(request);
        String content=jsonObject.getString("content");
        String answer=jsonObject.getString("answer");
        String description=jsonObject.getString("description");
        String kind=jsonObject.getString("kind");
        makePaperService.addQuestions(type,kind,userId,content,answer,description);
        Map map=new HashMap();
        map.put("msg","success");
        return map;
    }
    @RequestMapping("/showQuestions")
    @ResponseBody
    @RequiresRoles(value = {"admin"})
    public Map showQuestions(@RequestBody JSONObject jsonObject){
        Integer page = jsonObject.getInteger("page");
        Integer size = jsonObject.getInteger("size");
        Integer TotalNumber = makePaperService.showQNumber();
        List<ShowQuestions> list = makePaperService.showQuestions();
        return Paging.getPage(list,TotalNumber,size,page);
    }
    @RequestMapping("/addTag")
    @ResponseBody
    @RequiresRoles(value = {"admin"})
    public Map addTag(@RequestBody JSONObject jsonObject){
        String tag=jsonObject.getString("kind");
        Map map=new HashMap();
        map.put("msg",makePaperService.addTag(tag));
        return map;

    }
    @RequestMapping("/findAllTag")
    @ResponseBody
    @RequiresRoles(value = {"admin"})
    public List findAllTag(){
         return makePaperService.findAllTag();
    }
    @RequestMapping("/findTag")
    @ResponseBody
    @RequiresRoles(value = {"admin"})
    public List findTag(@RequestBody JSONObject jsonObject){
        String tag=jsonObject.getString("kind");
        return makePaperService.findTagFuzzy(tag);
    }
    @RequestMapping("/findQuestions")
    @ResponseBody
    @RequiresRoles(value = {"admin"})
    public Map findQuestions(@RequestBody JSONObject jsonObject){
        Integer page = jsonObject.getInteger("page");
        Integer size = jsonObject.getInteger("size");
        String tag = JSONArray.toJSONString(jsonObject.get("kind"));
        List<String> tagList = JSONArray.parseArray(tag, String.class);
        String type = JSONArray.toJSONString(jsonObject.get("type"));
        List<String> typeList = JSONArray.parseArray(type, String.class);
        List list=makePaperService.findQuestions(tagList,typeList);
        Map map=Paging.getPage(list,list.size(),size,page);
        return map;
    }
    @RequestMapping("/findQuestionsById")
    @ResponseBody
    @RequiresRoles(value = {"admin"})
    public ShowQuestions findQuestionsById(@RequestBody JSONObject jsonObject) {
        int questionId = jsonObject.getInteger("questionId");
        String qType = jsonObject.getString("type");
        System.out.println(qType);
        ShowQuestions questions=makePaperService.findQuestionsById(qType, questionId);
        if(questions!=null)
            questions.setQType(qType);
        return  questions;
    }
    @RequestMapping("/makePaper")
    @ResponseBody
    @RequiresRoles(value = {"admin"})
    public Map makePaper(@RequestBody JSONObject jsonObject) {
        String type=jsonObject.getString("type");
        int num0=jsonObject.getInteger("num0");
        int num1=jsonObject.getInteger("num1");
        int num2=jsonObject.getInteger("num2");
        int num3=jsonObject.getInteger("num3");
        return makePaperService.makePaper(type,num0,num1,num2,num3);
    }
    @RequestMapping("/makePaperSuccess")
    @ResponseBody
    @RequiresRoles(value = {"admin"})
    public Map makePaperSuccess(@RequestBody JSONObject jsonObject,HttpServletRequest request) throws ParseException {
        String qlist = JSONArray.toJSONString(jsonObject.get("list"));
        List<QInfo> list = JSONArray.parseArray(qlist, QInfo.class);
        String paperName=jsonObject.getString("paperName");
        int userId=jwtService.getUserId(request);
        String description=jsonObject.getString("description");
        String beginTime=jsonObject.getString("beginTime");
        Date beginTime1= StringToDate.turnToDate(beginTime);
        System.out.println(beginTime1);
        String deadline=jsonObject.getString("deadline");
        Date deadline1= StringToDate.turnToDate(deadline);
        System.out.println(deadline1);
        String code= RandomCode.genRandomNum();
        makePaperService.makePaperSuccess(beginTime1,deadline1,paperName,userId,description,code,list);
        Map map=new HashMap();
        map.put("code",code);
        return map;

    }
    }



