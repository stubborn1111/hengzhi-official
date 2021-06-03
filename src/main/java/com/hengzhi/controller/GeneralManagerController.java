package com.hengzhi.controller;

import com.alibaba.fastjson.JSONObject;
import com.hengzhi.entity.Message;
import com.hengzhi.service.GeneralManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.awt.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/generalManager")
@Controller
public class GeneralManagerController {

    @Autowired
    GeneralManagerService  generalManagerService;

    @ResponseBody
    @RequestMapping("/unExam")
    public Map unExam(@RequestBody JSONObject jsonObject){
        System.out.println("进来了");
        Integer page = jsonObject.getInteger("page");
        Integer size = jsonObject.getInteger("size");
        Map map = new HashMap();
        List<Message> list = generalManagerService.selectUnExamMeg(page,size);
        map.put("listMessage",list);
        Integer TotalNumber = generalManagerService.SelectCountUnExam();
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
}
