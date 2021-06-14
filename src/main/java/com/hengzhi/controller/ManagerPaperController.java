package com.hengzhi.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.hengzhi.dto.ManagerPaper.*;
import com.hengzhi.service.ManagerPaperService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.w3c.dom.ls.LSInput;

import java.rmi.MarshalledObject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/managerPaper")
@Controller
public class ManagerPaperController {

    @Autowired
    ManagerPaperService managerPaperService;


    /*
    待改试卷
     */
    @ResponseBody
    @RequestMapping("/unChange")
    @RequiresRoles(value = {"admin"})
    public Map unChange(){
        Map map = new HashMap();
        List<UnChangePapers> list = managerPaperService.selectUnChange();
        map.put("list",list);
        Integer totalNumber = managerPaperService.selectUnChangeNumber();
        map.put("totalNumber",totalNumber);
        return  map;
    }

    /*
    已改试卷信息
     */
    @ResponseBody
    @RequestMapping("/selectChange")
    @RequiresRoles(value = {"admin"})
    public Map selectChange(){
        Map map = new HashMap();
        List<ChangePapers> list = managerPaperService.selectChange();
        map.put("list",list);
        return map;
    }

    /*
   未考试卷数据
    */
    @ResponseBody
    @RequestMapping("/selectUnFinish")
    @RequiresRoles(value = {"admin"})
    public Map selectUnFinish(){
        Map map = new HashMap();
        List<UnFinishPapers> list = managerPaperService.selectUnFinish();
        map.put("list",list);
        return map;
    }
    /*
    试卷成绩信息
     */
    @ResponseBody
    @RequestMapping("/scoreInformation")
    @RequiresRoles(value = {"admin"})
    public Map scoreInformation(@RequestBody JSONObject jsonObject){
        Integer paperId = jsonObject.getInteger("paperId");
        Map map = new HashMap();
        List<ScoreInformation> list = managerPaperService.selectScoreInformation(paperId);
        map.put("list",list);
        Integer sum = managerPaperService.selectSumScore(paperId);
        Integer count = managerPaperService.selectSumPeople(paperId);
        double average = (sum*1.0)/count;
        map.put("average",average);
        return map;
    }
    /*
    修改未考试卷信息
     */
    @ResponseBody
    @RequestMapping("/updateUnTestPaper")
    @RequiresRoles(value = {"admin"})
    public Map updateUnTestPaper(@RequestBody UnTestPaper unTestPaper){
        managerPaperService.unTestPaper(unTestPaper);
        Map map = new HashMap();
        map.put("message","成功修改");
        return map;
    }
}
