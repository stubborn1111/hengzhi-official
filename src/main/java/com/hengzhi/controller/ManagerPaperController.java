package com.hengzhi.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.hengzhi.dto.ManagerPaper.*;
import com.hengzhi.dto.paperAndTest.QuestionAnswer;
import com.hengzhi.entity.Message;
import com.hengzhi.service.ManagerPaperService;

import jdk.nashorn.internal.scripts.JO;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import sun.rmi.server.InactiveGroupException;

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
    public Map unChange(@RequestBody JSONObject jsonObject){
        Integer page = jsonObject.getInteger("page");
        Integer size = jsonObject.getInteger("size");
        Map map = new HashMap();
        Integer TotalNumber = managerPaperService.selectUnChangeNumber();
        map.put("TotalNumber",TotalNumber);
        Integer pagesSize;
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
            List<UnChangePapers> list = managerPaperService.selectUnChange( page, size);
            map.put("list",list);
            map.put("page",page);
            return map;
        }
    }

    /*
    已改试卷信息
     */
    @ResponseBody
    @RequestMapping("/selectChange")
    @RequiresRoles(value = {"admin"})
    public Map selectChange(@RequestBody JSONObject jsonObject){
        Integer page = jsonObject.getInteger("page");
        Integer size = jsonObject.getInteger("size");
        Map map = new HashMap();
        Integer TotalNumber = managerPaperService.selectChangeNumber();
        map.put("TotalNumber",TotalNumber);
        Integer pagesSize;
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
            List<ChangePapers> list = managerPaperService.selectChange(page,size);
            map.put("list",list);
            map.put("page",page);
            return map;
        }

    }

    /*
   未考试卷数据
    */
    @ResponseBody
    @RequestMapping("/selectUnFinish")
    @RequiresRoles(value = {"admin"})
    public Map selectUnFinish(@RequestBody JSONObject jsonObject){
        Integer page = jsonObject.getInteger("page");
        Integer size = jsonObject.getInteger("size");
        Map map = new HashMap();
        Integer TotalNumber = managerPaperService.selectUnFinishNumber();
        map.put("TotalNumber",TotalNumber);
        Integer pagesSize;
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
            List<UnFinishPapers> list = managerPaperService.selectUnFinish(page,size);
            map.put("list",list);
            map.put("page",page);
            return map;
        }
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
                List<SubjectContent> list = managerPaperService.selectSubjectContentFill(questionIdList.get(i),paperId);
                subjectContentList.add(list);
                System.out.println(0);
            }
            //单选题
           else if(numberList.get(i).equals(1)){
                List<SubjectContent> list = managerPaperService.selectSubjectContentSingle(questionIdList.get(i),paperId);
                subjectContentList.add(list);
                System.out.println("question +"+questionIdList.get(i));
                System.out.println("list  "+list);
                System.out.println(1);
            }
            //多选题
           else if(numberList.get(i).equals(2)){
                List<SubjectContent> list = managerPaperService.selectSubjectContentMultiple(questionIdList.get(i),paperId);
                subjectContentList.add(list);
                System.out.println(2);
            }else {
                List<SubjectContent> list = managerPaperService.selectSubjectContentSubjective(questionIdList.get(i),paperId);
                subjectContentList.add(list);
                System.out.println(3);
            }
        }
       // System.out.println("subjectContentList+  "+subjectContentList);
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
        Integer sum=0;
        List<QuestionAnswer1> answerList = JSONArray.parseArray(text, QuestionAnswer1.class);
        for (int i = 0;i<answerList.size();i++){
            Integer score = answerList.get(i).getScore();
            Integer qNumber = answerList.get(i).getQNumber();
            System.out.println("score"+score);
            sum = sum+score;
            System.out.println("qNumber"+qNumber);
            managerPaperService.updateAnswerPaper(score,paperId,userId,qNumber);
        }
        //取出单选和双选的总分
        Integer sum1 = managerPaperService.selectSum1(userId,paperId);
        Integer score = sum1 + sum;
        //将总分存到user_paper
        managerPaperService.updateSum(score,userId,paperId);
        Map map = new HashMap();
        map.put("message","success");
        return map;
    }
}
