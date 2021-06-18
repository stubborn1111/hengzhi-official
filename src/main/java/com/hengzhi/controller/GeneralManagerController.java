package com.hengzhi.controller;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.dialect.helper.HsqldbDialect;
import com.hengzhi.entity.Message;
import com.hengzhi.service.GeneralManagerService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.omg.PortableInterceptor.INACTIVE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/generalManager")
@CrossOrigin(origins = "*",maxAge = 3600)
@RestController
public class GeneralManagerController {

    @Autowired
    GeneralManagerService  generalManagerService;

    @ResponseBody
    @RequestMapping("/unExam")
    @RequiresRoles(value = {"admin"})
    public Map unExam(@RequestBody JSONObject jsonObject){
        System.out.println("进来了");
        Integer page = jsonObject.getInteger("page");
        Integer size = jsonObject.getInteger("size");
        Integer pagesSize;
        Map map = new HashMap();
        Integer TotalNumber = generalManagerService.SelectCountUnExam();
        map.put("TotalNumber",TotalNumber);
        if(TotalNumber<size){
            map.put("pagesSize",1);
            pagesSize = 1;
        } else if(TotalNumber%size==0){
            map.put("pagesSize",TotalNumber/size);
            pagesSize =  TotalNumber/size;
        }else {
            map.put("pagesSize",TotalNumber/size+1);
            pagesSize =  TotalNumber/size+1;
        }
        if(page>pagesSize){
            return null;
        }else {
            List<Message> list = generalManagerService.selectUnExamMeg(page,size);
            map.put("listMessage",list);
            map.put("page",page);
            return map;
        }

    }

    @ResponseBody
    @RequestMapping("/approved")
    @RequiresRoles(value = {"admin"})
    public Map approved(@RequestBody JSONObject jsonObject ){
        Integer messageId = jsonObject.getInteger("messageId");
        Map  map = new HashMap();
        generalManagerService.approved(messageId);
        map.put("message","通过审核");
        return map;
    }

    @ResponseBody
    @RequestMapping("/rejectReview")
    @RequiresRoles(value = {"admin"})
    public Map rejectReview(@RequestBody JSONObject jsonObject){
        Integer messageId = jsonObject.getInteger("messageId");
        Map map = new HashMap();
        generalManagerService.rejectReview(messageId);
        map.put("message","审核不通过");
        return  map;
    }
    


}
