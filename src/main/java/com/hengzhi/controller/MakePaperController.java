package com.hengzhi.controller;

import com.alibaba.fastjson.JSONObject;
import com.hengzhi.entity.Introduction;
import com.hengzhi.entity.Message;
import com.hengzhi.entity.Notice;
import com.hengzhi.entity.Questions;
import com.hengzhi.secutity.Security;
import com.hengzhi.service.MakePaperService;
import com.hengzhi.service.ShowService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.*;

@RequestMapping("/makePaper")
@Controller
public class MakePaperController {
    @Autowired
    MakePaperService makePaperService;
//    增加题目
    @RequestMapping("/addQuestions")
    @ResponseBody
    @RequiresRoles(value = {"admin"})
    public void addQuestions(@RequestBody JSONObject jsonObject){
        String type=jsonObject.getString("type");
        int userId=jsonObject.getInteger("userId");
        String content=jsonObject.getString("content");
        String answer=jsonObject.getString("answer");
        String description=jsonObject.getString("description");
        String kind=jsonObject.getString("kind");
        makePaperService.addQuestions(type,kind,userId,content,answer,description);
    }
    @RequestMapping("/showQuestions")
    @ResponseBody
    @RequiresRoles(value = {"admin"})
    public Map showQuestions(@RequestBody JSONObject jsonObject){
        Integer page = jsonObject.getInteger("page");
        Integer size = jsonObject.getInteger("size");
        Integer TotalNumber = makePaperService.showQNumber();
        System.out.println(TotalNumber/size);
        Double all= Math.ceil((float)TotalNumber/size);
        int allP=all.intValue();
        Map map = new HashMap();
        if(page<=allP){
        List<Questions> list = makePaperService.showQuestions();
        List<Questions> qlist=new ArrayList<>();
        int start=size*(page-1);
        int end=size*page-1;
        if(end>=list.size()){
            end=list.size()-1;
        }
        for(int i=start;i<=end;i++){
            Questions questions=list.get(i);
            qlist.add(questions);
        }

        map.put("listQuestions",qlist);}

       else map.put("listQuestions",null);
        map.put("TotalNumber",TotalNumber);
        if(TotalNumber<size){
            map.put("pagesSize",1);
        } else if(TotalNumber%size==0){
            map.put("pagesSize",TotalNumber/size);
        }else {
            map.put("pagesSize",TotalNumber/size+1);
        }
        return map;

    }
    @RequestMapping("/addTag")
    @ResponseBody
    @RequiresRoles(value = {"admin"})
    public String addTag(@RequestBody JSONObject jsonObject){
        String tag=jsonObject.getString("kind");
        return makePaperService.addTag(tag);
    }
    @RequestMapping("/findTag")
    @ResponseBody
    @RequiresRoles(value = {"admin"})
    public List findTag(@RequestBody JSONObject jsonObject){
        String tag=jsonObject.getString("kind");
        return makePaperService.findTagFuzzy(tag);
    }
    
    }



