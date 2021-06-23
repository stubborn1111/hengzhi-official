package com.hengzhi.service.impl;

import com.hengzhi.dao.MakePaperDao;
import com.hengzhi.dao.UserDao;
import com.hengzhi.dto.paperAndTest.QInfo;
import com.hengzhi.dto.paperAndTest.ShowQuestions;
import com.hengzhi.dto.paperAndTest.Tag;
import com.hengzhi.dto.userBasic.UserInfo;
import com.hengzhi.entity.*;
import com.hengzhi.service.MakePaperService;
import com.hengzhi.utils.SelectTableUtils;
import com.hengzhi.utils.RandomNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MakePaperServiceImpl implements MakePaperService {

    @Autowired
    MakePaperDao makePaperDao;
    @Autowired
    UserDao userDao;
    @Override
    public void addQuestions(String type,String kind,int userId,String content,String answer,String description){
       String qType= SelectTableUtils.selectT(type);
       makePaperDao.addQuestions(qType,kind, userId, content, answer, description);
    }
    @Override
    public List<ShowQuestions> showQuestions() {
        List<Questions> list = makePaperDao.showQuestions1();
        for(int i=0;i<list.size();i++){
            list.get(i).setQType("0");
        }
        List<Questions> list1=makePaperDao.showQuestions2();
        List<Questions> list2=makePaperDao.showQuestions3();
        List<Questions> list3=makePaperDao.showQuestions4();
        for(int m=0;m<list1.size();m++){
            list1.get(m).setQType("1");
            Questions questions= (Questions) list1.get(m);
            list.add(questions);
        }
        for(int m=0;m<list2.size();m++){
            list2.get(m).setQType("2");
            Questions questions= (Questions) list2.get(m);
            list.add(questions);
        }
        for(int m=0;m<list3.size();m++){
            list3.get(m).setQType("3");
            Questions questions= (Questions) list3.get(m);
            list.add(questions);
        }
        List<ShowQuestions> list4=new ArrayList<>();
        for(int n=0;n<list.size();n++){
            Questions questions=list.get(n);
            int userId=questions.getUserId();
            UserInfo user=userDao.getUserInfo(userId);
            ShowQuestions showQuestions=new ShowQuestions();
            showQuestions.setUserName(user.getName());
            showQuestions.setAnswer(questions.getAnswer());
            showQuestions.setContent(questions.getContent());
            showQuestions.setCorrectNumber(questions.getCorrectNumber());
            showQuestions.setCRate(questions.getCRate());
            showQuestions.setDescription(questions.getDescription());
            showQuestions.setKind(questions.getKind());
            showQuestions.setQType(questions.getQType());
            showQuestions.setQuestionId(questions.getQuestionId());
            showQuestions.setTotalNumber(questions.getTotalNumber());
            list4.add(showQuestions);
        }
        System.out.println(list);
        return list4;
    }
    public List<ShowQuestions> showQuestionsByKeyWord(String keyWord){
        List<Questions> list = makePaperDao.findQuestionsByKeyWords(keyWord,"questions_fill");
        for(int i=0;i<list.size();i++){
            list.get(i).setQType("0");
        }
        List<Questions> list1=makePaperDao.findQuestionsByKeyWords(keyWord,"questions_multiple");
        List<Questions> list2=makePaperDao.findQuestionsByKeyWords(keyWord,"questions_single");
        List<Questions> list3=makePaperDao.findQuestionsByKeyWords(keyWord,"questions_subjective");
        for(int m=0;m<list1.size();m++){
            list1.get(m).setQType("1");
            Questions questions= (Questions) list1.get(m);
            list.add(questions);
        }
        for(int m=0;m<list2.size();m++){
            list2.get(m).setQType("2");
            Questions questions= (Questions) list2.get(m);
            list.add(questions);
        }
        for(int m=0;m<list3.size();m++){
            list3.get(m).setQType("3");
            Questions questions= (Questions) list3.get(m);
            list.add(questions);
        }
        List<ShowQuestions> list4=new ArrayList<>();
        for(int n=0;n<list.size();n++){
            Questions questions=list.get(n);
            int userId=questions.getUserId();
            UserInfo user=userDao.getUserInfo(userId);
            ShowQuestions showQuestions=new ShowQuestions();
            showQuestions.setUserName(user.getName());
            showQuestions.setAnswer(questions.getAnswer());
            showQuestions.setContent(questions.getContent());
            showQuestions.setCorrectNumber(questions.getCorrectNumber());
            showQuestions.setCRate(questions.getCRate());
            showQuestions.setDescription(questions.getDescription());
            showQuestions.setKind(questions.getKind());
            showQuestions.setQType(questions.getQType());
            showQuestions.setQuestionId(questions.getQuestionId());
            showQuestions.setTotalNumber(questions.getTotalNumber());
            list4.add(showQuestions);
        }
        System.out.println(list);
        return list4;
    }
    @Override
    public Integer showQNumber(){
        return makePaperDao.showQNumber1()+makePaperDao.showQNumber2()+makePaperDao.showQNumber3()+makePaperDao.showQNumber4();
    }
    @Override
    public List findAllTag(){
        return makePaperDao.findAllTag();
    }
    @Override
    public String addTag(String tagName){
        Tag tag=makePaperDao.findTag(tagName);
        if(tag!=null){
            return "该tag已存在";
        }
        else {
            makePaperDao.addTag(tagName);
            return "success";
        }
    }
    @Override
    public List findTagFuzzy(String tagName){
        return makePaperDao.findTagFuzzy(tagName);
    }
    @Override
    public List findQuestions(List<String> tList,List<String> sList) {
        System.out.println(tList+"----"+sList);
        List list = new ArrayList();
        List type=new ArrayList();
        if (sList.isEmpty()) {
            type.add("0");
            type.add("1");
            type.add("2");
            type.add("3");
        }
        else type=sList;
        List<Questions> list0 = new ArrayList<>();
        List<Questions> list1 = new ArrayList<>();
        List<Questions> list2 = new ArrayList<>();
        List<Questions> list3 = new ArrayList<>();
        if(tList.isEmpty()){
            list0=makePaperDao.showQuestions1();
            list1=makePaperDao.showQuestions2();
            list2=makePaperDao.showQuestions3();
            list3=makePaperDao.showQuestions4();
        }
        for (int i = 0; i < type.size(); i++) {
            String type1 = (String) type.get(i);
            if (type1.equals("0"))
                list0 = makePaperDao.findQuestionByTag1(tList);
            if (type1.equals("1"))
                list1 = makePaperDao.findQuestionByTag2(tList);
            if (type1.equals("2"))
                list2 = makePaperDao.findQuestionByTag3(tList);
            if (type1.equals("3"))
                list3 = makePaperDao.findQuestionByTag4(tList);
        }


        if (list0 != null) {
            for (int i = 0; i < list0.size(); i++) {
                Questions questions = list0.get(i);
                questions.setQType("0");
                list.add(questions);
            }
        }
        if (list1 != null) {
            for (int i = 0; i < list1.size(); i++) {
                Questions questions = list1.get(i);
                questions.setQType("1");
                list.add(questions);
            }
        }
        if (list2 != null) {
            for (int i = 0; i < list2.size(); i++) {
                Questions questions = list2.get(i);
                questions.setQType("2");
                list.add(questions);
            }
        }
        if (list3 != null) {
            for (int i = 0; i < list3.size(); i++) {
                Questions questions = list3.get(i);
                questions.setQType("3");
                list.add(questions);
            }
        }
        List<ShowQuestions> list4=new ArrayList<>();
        for(int n=0;n<list.size();n++){
            Questions questions= (Questions) list.get(n);
            int userId=questions.getUserId();
            UserInfo user=userDao.getUserInfo(userId);
            ShowQuestions showQuestions=new ShowQuestions();
            showQuestions.setUserName(user.getName());
            showQuestions.setAnswer(questions.getAnswer());
            showQuestions.setContent(questions.getContent());
            showQuestions.setCorrectNumber(questions.getCorrectNumber());
            showQuestions.setCRate(questions.getCRate());
            showQuestions.setDescription(questions.getDescription());
            showQuestions.setKind(questions.getKind());
            showQuestions.setQType(questions.getQType());
            showQuestions.setQuestionId(questions.getQuestionId());
            showQuestions.setTotalNumber(questions.getTotalNumber());
            list4.add(showQuestions);
        }
        return list4;
    }
    @Override
    public ShowQuestions findQuestionsById(String qType,int questionId){
        String type=SelectTableUtils.selectT(qType);
            Questions questions=makePaperDao.findQuestionsById(type,questionId);
            int userId=questions.getUserId();
            UserInfo user=userDao.getUserInfo(userId);
            ShowQuestions showQuestions=new ShowQuestions();
            showQuestions.setUserName(user.getName());
            showQuestions.setAnswer(questions.getAnswer());
            showQuestions.setContent(questions.getContent());
            showQuestions.setCorrectNumber(questions.getCorrectNumber());
            showQuestions.setCRate(questions.getCRate());
            showQuestions.setDescription(questions.getDescription());
            showQuestions.setKind(questions.getKind());
            showQuestions.setQType(questions.getQType());
            showQuestions.setQuestionId(questions.getQuestionId());
            showQuestions.setTotalNumber(questions.getTotalNumber());
            return showQuestions;
    }
    @Override
    public Map makePaper(String type, int num0,int num1,int num2,int num3) {
        Map map=new HashMap();
        System.out.println(type);
        List<Questions> list0 = new ArrayList<>();
        List<Questions> list1 = new ArrayList<>();
        List<Questions> list2 = new ArrayList<>();
        List<Questions> list3 = new ArrayList<>();
        List<ShowQuestions> list00=new ArrayList<>();
        List<ShowQuestions> list11=new ArrayList<>();
        List<ShowQuestions> list22=new ArrayList<>();
        List<ShowQuestions> list33=new ArrayList<>();
        list0=makePaperDao.makePaperFind(type,"questions_fill");
        list1=makePaperDao.makePaperFind(type,"questions_single");
        list2=makePaperDao.makePaperFind(type,"questions_multiple");
        list3=makePaperDao.makePaperFind(type,"questions_subjective");
        if(num0==0){
            map.put("questions_fill",null);
        }
        else{
            if(num0>list0.size()){
                map.put("questions_fill","not enough");
            }
            else {
                List<Questions> list=new ArrayList<>();
                int[] arr = RandomNumber.genNum(num0,list0.size());
                System.out.println(arr);
                for(int i=0;i<arr.length;i++){
                    Questions questions=list0.get(i);
                    questions.setQType("0");
                    list.add(questions);
                    int userId=questions.getUserId();
                    UserInfo user=userDao.getUserInfo(userId);
                    ShowQuestions showQuestions=new ShowQuestions();
                    showQuestions.setUserName(user.getName());
                    showQuestions.setAnswer(questions.getAnswer());
                    showQuestions.setContent(questions.getContent());
                    showQuestions.setCorrectNumber(questions.getCorrectNumber());
                    showQuestions.setCRate(questions.getCRate());
                    showQuestions.setDescription(questions.getDescription());
                    showQuestions.setKind(questions.getKind());
                    showQuestions.setQType(questions.getQType());
                    showQuestions.setQuestionId(questions.getQuestionId());
                    showQuestions.setTotalNumber(questions.getTotalNumber());
                    list00.add(showQuestions);
                }
                map.put("questions_fill",list00);
            }
        }
        if(num1==0){
            map.put("questions_single",null);
        }
        else {
            if(num1>list1.size()){
                map.put("questions_single","not enough");
            }
            else {
                List<Questions> list=new ArrayList<>();
                int[] arr = RandomNumber.genNum(num1,list1.size());
                System.out.println(arr);
                for(int i=0;i<arr.length;i++){
                    Questions questions=list1.get(i);
                    questions.setQType("1");
                    list.add(questions);
                    int userId=questions.getUserId();
                    UserInfo user=userDao.getUserInfo(userId);
                    ShowQuestions showQuestions=new ShowQuestions();
                    showQuestions.setUserName(user.getName());
                    showQuestions.setAnswer(questions.getAnswer());
                    showQuestions.setContent(questions.getContent());
                    showQuestions.setCorrectNumber(questions.getCorrectNumber());
                    showQuestions.setCRate(questions.getCRate());
                    showQuestions.setDescription(questions.getDescription());
                    showQuestions.setKind(questions.getKind());
                    showQuestions.setQType(questions.getQType());
                    showQuestions.setQuestionId(questions.getQuestionId());
                    showQuestions.setTotalNumber(questions.getTotalNumber());
                    list11.add(showQuestions);
                }
                map.put("questions_single",list11);
            }
        }
        if(num2==0){
            map.put("questions_multiple",null);
        }
        else {
            if(num2>list2.size()){
                map.put("questions_multiple","not enough");
            }
            else {
                List<Questions> list=new ArrayList<>();
                int[] arr = RandomNumber.genNum(num2,list2.size());
                System.out.println(arr);
                for(int i=0;i<arr.length;i++){
                    Questions questions=list2.get(i);
                    questions.setQType("2");
                    list.add(questions);
                    int userId=questions.getUserId();
                    UserInfo user=userDao.getUserInfo(userId);
                    ShowQuestions showQuestions=new ShowQuestions();
                    showQuestions.setUserName(user.getName());
                    showQuestions.setAnswer(questions.getAnswer());
                    showQuestions.setContent(questions.getContent());
                    showQuestions.setCorrectNumber(questions.getCorrectNumber());
                    showQuestions.setCRate(questions.getCRate());
                    showQuestions.setDescription(questions.getDescription());
                    showQuestions.setKind(questions.getKind());
                    showQuestions.setQType(questions.getQType());
                    showQuestions.setQuestionId(questions.getQuestionId());
                    showQuestions.setTotalNumber(questions.getTotalNumber());
                    list22.add(showQuestions);
                }
                map.put("questions_multiple",list22);

            }
        }
        if(num3==0){
            map.put("questions_subjective",null);
        }
        else {
            if(num3>list3.size()){
                map.put("questions_subjective","not enough");
            }
            else {

                List<Questions> list=new ArrayList<>();
                int[] arr = RandomNumber.genNum(num3,list3.size());
                System.out.println(arr);
                for(int i=0;i<arr.length;i++){
                    Questions questions=list3.get(i);
                    questions.setQType("3");
                    list.add(questions);
                    int userId=questions.getUserId();
                    UserInfo user=userDao.getUserInfo(userId);
                    ShowQuestions showQuestions=new ShowQuestions();
                    showQuestions.setUserName(user.getName());
                    showQuestions.setAnswer(questions.getAnswer());
                    showQuestions.setContent(questions.getContent());
                    showQuestions.setCorrectNumber(questions.getCorrectNumber());
                    showQuestions.setCRate(questions.getCRate());
                    showQuestions.setDescription(questions.getDescription());
                    showQuestions.setKind(questions.getKind());
                    showQuestions.setQType(questions.getQType());
                    showQuestions.setQuestionId(questions.getQuestionId());
                    showQuestions.setTotalNumber(questions.getTotalNumber());
                    list33.add(showQuestions);
                }
                map.put("questions_subjective",list33);

            }
        }

        return map;
    }
     @Override
    public void makePaperSuccess(Date beginTime, Date endTime, String paperName, int userId, String description, String code, List<QInfo> list){
        int score=0;
        for(int i=0;i<list.size();i++){
            QInfo qInfo=list.get(i);
            String type=qInfo.getQType();
            if(type.equals("0")) score+=5;
            if(type.equals("1")) score+=5;
            if(type.equals("2")) score+=5;
            if(type.equals("3")) score+=10;
        }
        makePaperDao.addPaper(beginTime,endTime,paperName,userId,description,code,score);
        Papers papers=makePaperDao.findPaperByCode(code);
        int paperId=papers.getPaperId();
        for(int i=0;i<list.size();i++){
            QInfo qInfo=list.get(i);
            makePaperDao.addQuestionsInPaper(paperId,i+1,qInfo.getQuestionId(),qInfo.getQType());
        }
     }
    }
