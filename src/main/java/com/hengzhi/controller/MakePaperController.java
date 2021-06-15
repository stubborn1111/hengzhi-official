package com.hengzhi.controller;

import com.alibaba.fastjson.JSONObject;
import com.hengzhi.entity.Introduction;
import com.hengzhi.entity.Message;
import com.hengzhi.entity.Notice;
import com.hengzhi.secutity.Security;
import com.hengzhi.service.MakePaperService;
import com.hengzhi.service.ShowService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RequestMapping("/makePaper")
@Controller
@CrossOrigin(origins = "*",maxAge = 3600)
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
    
    }



