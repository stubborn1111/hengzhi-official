package com.hengzhi.controller;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hengzhi.dto.paperAndTest.GetPaper;
import com.hengzhi.dto.paperAndTest.QuestionAnswer;
import com.hengzhi.dto.paperAndTest.TestedPaper;
import com.hengzhi.dto.paperAndTest.UntestedPaper;
import com.hengzhi.service.StudentTestService;
import com.hengzhi.service.impl.JWTServiceImpl;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * @author Jane
 * @version 1.0
 * @description 试卷和考试控制类
 * @Date 2021/5/29
 */
@CrossOrigin(origins = "*",maxAge = 3600)
@RequestMapping("/studentTest")
@RestController
public class StudentTestController {
    @Autowired
    StudentTestService testService;
    @Autowired
    JWTServiceImpl jwtService;

    /**
     * 根据邀请码获取试卷
     * @param jsonObject
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping("/getPaper")
    @RequiresRoles(value = {"user"})
    public GetPaper getPaper(@RequestBody JSONObject jsonObject, HttpServletRequest request) {
        String code = jsonObject.getString("code");
        Integer userId = jwtService.getUserId(request);
        return  testService.getPaper(code, userId);
    }

    /**
     * 获取未考试卷列表
     * @param jsonObject
     * @return
     */
    @ResponseBody
    @RequestMapping("getUnTestedPapers")
    @RequiresRoles(value = {"user", "admin"}, logical = Logical.OR)
    public PageInfo<UntestedPaper> getUnTestedPapers(@RequestBody JSONObject jsonObject,HttpServletRequest request) {
        Integer pageNo = jsonObject.getInteger("pageNo");//第n页
        Integer pageSize = jsonObject.getInteger("pageSize");//n条数据
        //开始分页
        PageHelper.startPage(pageNo, pageSize);
        Integer userId = jwtService.getUserId(request);
        //List<UntestedPaper> untestedPapers = testService.getUntestedPapers(userId);
        PageInfo<UntestedPaper> pageInfo = new PageInfo<>(testService.getUntestedPapers(userId));
        return pageInfo;
    }

    /**
     * 获取已考试卷列表
     * @param jsonObject
     * @return
     */
    @ResponseBody
    @RequestMapping("getTestedPapers")
    @RequiresRoles(value = {"user", "admin"}, logical = Logical.OR)
    public PageInfo<TestedPaper> getTestedPapers(@RequestBody JSONObject jsonObject,HttpServletRequest request) {
        Integer pageNo = jsonObject.getInteger("pageNo");//第n页
        Integer pageSize = jsonObject.getInteger("pageSize");//n条数据
        PageHelper.startPage(pageNo, pageSize);
        Integer userId = jwtService.getUserId(request);
        PageInfo<TestedPaper> testedPapers = new PageInfo<>(testService.getTestedPapers(userId));
        return testedPapers;
    }

    /**
     * 查看考试了的试卷
     * @param jsonObject
     * @return
     */
    @ResponseBody
    @RequestMapping("viewTestedPaper")
    @RequiresRoles(value = {"user", "admin"}, logical = Logical.OR)
    public Map viewTestedPaper(@RequestBody JSONObject jsonObject,HttpServletRequest request) {
        Integer paperId = jsonObject.getInteger("paperId");
        Integer userId = jsonObject.getInteger("userId");
        Map map = testService.viewTestedPaper(paperId, userId);
        System.out.println(map);
        return map;
    }

    /**
     * 考试
     * @param jsonObject
     * @return
     */
    @ResponseBody
    @RequestMapping("test")
    @RequiresRoles(value = {"user", "admin"}, logical = Logical.OR)
    public Map test(@RequestBody JSONObject jsonObject) {
        Integer paperId = jsonObject.getInteger("paperId");
        Map test = testService.test(paperId);
        return test;
    }

    /**
     * 交卷
     * @param jsonObject
     */
    @ResponseBody
    @RequestMapping("/submitPaper")
    @RequiresRoles(value = {"user", "admin"}, logical = Logical.OR)
    public void submitPaper(@RequestBody JSONObject jsonObject,HttpServletRequest request) {
        Integer userId = jwtService.getUserId(request);
        testService.submitPaper(jsonObject,userId);
    }

}
