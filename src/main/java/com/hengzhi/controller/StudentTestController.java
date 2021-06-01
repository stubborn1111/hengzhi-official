package com.hengzhi.controller;

import com.alibaba.fastjson.JSONObject;
import com.hengzhi.dto.paperAndTest.TestedPaper;
import com.hengzhi.dto.paperAndTest.UntestedPaper;
import com.hengzhi.service.StudentTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * @author Jane
 * @version 1.0
 * @description 试卷和考试控制类
 * @Date 2021/5/29
 */
@RequestMapping("/studentTest")
@Controller
public class StudentTestController {
    @Autowired
    StudentTestService testService;

    @ResponseBody
    @RequestMapping("/getPaper")
    public Integer getPaper(@RequestBody JSONObject jsonObject) {
        String code = jsonObject.getString("code");
        return testService.getPaper(code);
    }

    @ResponseBody
    @RequestMapping("getUnTestedPapers")
    public List<UntestedPaper> getUnTestedPapers(@RequestBody JSONObject jsonObject) {
        Integer userId = jsonObject.getInteger("userId");
        List<UntestedPaper> untestedPapers = testService.getUntestedPapers(userId);
        return untestedPapers;
    }

    @ResponseBody
    @RequestMapping("getTestedPapers")
    public List<TestedPaper> getTestedPapers(@RequestBody JSONObject jsonObject) {
        Integer userId = jsonObject.getInteger("userId");
        List<TestedPaper> testedPapers = testService.getTestedPapers(userId);
        return testedPapers;
    }

    @ResponseBody
    @RequestMapping("viewTestedPaper")
    public Map viewTestedPaper(@RequestBody JSONObject jsonObject) {
        Integer paperId = jsonObject.getInteger("paperId");
        Integer userId = jsonObject.getInteger("userId");
        Map map = testService.viewTestedPaper(paperId, userId);
        return map;
    }

    @ResponseBody
    @RequestMapping("test")
    public Map test(@RequestBody JSONObject jsonObject) {
        Integer paperId = jsonObject.getInteger("paperId");
        Map test = testService.test(paperId);
        return test;
    }



}
