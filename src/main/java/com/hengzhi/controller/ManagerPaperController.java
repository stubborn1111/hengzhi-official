package com.hengzhi.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.hengzhi.dto.ManagerPaper.*;
import com.hengzhi.dto.paperAndTest.QuestionAnswer;
import com.hengzhi.service.ManagerPaperService;

import jdk.nashorn.internal.scripts.JO;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.crypto.spec.PSource;
import java.util.*;

@RequestMapping("/managerPaper")
@Controller
@CrossOrigin(origins = "*",maxAge = 3600)
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
    /*
    改卷（给前端显示）
     */
    @ResponseBody
    @RequestMapping("/selectNewsFront")
    @RequiresRoles(value = {"admin"})
    public Map selectNewsFront(@RequestBody JSONObject jsonObject){
        Map map = new HashMap();
        Integer paperId = jsonObject.getInteger("paperId");
        Integer page = jsonObject.getInteger("page");
        //Integer size = jsonObject.getInteger("size");
        //返回给前端题目列表
            //题号按顺序返回
        ArrayList<Integer> numberList = managerPaperService.selectType(paperId);
        System.out.println(numberList);
        ArrayList<Integer> questionIdList = managerPaperService.selectQuestionId(paperId);
        System.out.println(questionIdList);
        List subjectContentList = new LinkedList();
        int length = numberList.size();
        Integer size = length;
        for(int i = 0;i<length;i++){
            //填空题
            System.out.println("number"+numberList.get(i));
            if(numberList.get(i).equals(0)){
                List<SubjectContent> list = managerPaperService.selectSubjectContentFill(questionIdList.get(i));
                subjectContentList.add(list);
                System.out.println(0);
            }
            //单选题
           else if(numberList.get(i).equals(1)){
                List<SubjectContent> list = managerPaperService.selectSubjectContentSingle(questionIdList.get(i));
                subjectContentList.add(list);
                System.out.println("question +"+questionIdList.get(i));
                System.out.println("list  "+list);
                System.out.println(1);
            }
            //多选题
           else if(numberList.get(i).equals(2)){
                List<SubjectContent> list = managerPaperService.selectSubjectContentMultiple(questionIdList.get(i));
                subjectContentList.add(list);
                System.out.println(2);
            }else {
                List<SubjectContent> list = managerPaperService.selectSubjectContentSubjective(questionIdList.get(i));
                subjectContentList.add(list);
                System.out.println(3);
            }
        }
        map.put("subjectContentList",subjectContentList);

        //返回给前端学生答题列表
        List<UnCorrectStudentList> list1 = managerPaperService.unCorrectStudent1(paperId,page,size);
        map.put("studentList",list1);

        //还剩下多少张试卷
            //返回答题人数
        Integer num1 = managerPaperService.selectAllPeople(paperId);
            //返回已经批改的数目
        Integer num2 = managerPaperService.selectCorrect(paperId);
        Integer num = num1-num2;
        map.put("pageSize",num);
        map.put("TotalNumber",num);
        map.put("page",page);
        return map;

    }

    /*
    改卷（给后端存取数据）
     */
    @ResponseBody
    @RequestMapping("/updateAnswerPaper")
    @RequiresRoles(value = {"admin"})
    public Map updateAnswerPaper(@RequestBody JSONObject jsonObject){

        Integer paperId = jsonObject.getInteger("paperId");
        Integer userId = jsonObject.getInteger("userId");
        String text = JSONArray.toJSONString(jsonObject.get("list"));
        List<QuestionAnswer1> answerList = JSONArray.parseArray(text, QuestionAnswer1.class);
        for (int i = 0;i<answerList.size();i++){
            Integer score = answerList.get(i).getScore();
            Integer qNumber = answerList.get(i).getQNumber();
            System.out.println("score"+score);
            System.out.println("qNumber"+qNumber);
            managerPaperService.updateAnswerPaper(score,paperId,userId,qNumber);
        }

        Map map = new HashMap();
        map.put("message","success");
        return map;
    }
}
