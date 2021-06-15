package com.hengzhi.service.impl;

import com.hengzhi.dao.MakePaperDao;
import com.hengzhi.dto.paperAndTest.Tag;
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
    @Override
    public void addQuestions(String type,String kind,int userId,String content,String answer,String description){
       String qType= SelectTableUtils.selectT(type);
       makePaperDao.addQuestions(qType,kind, userId, content, answer, description);
    }
    @Override
    public List<Questions> showQuestions() {
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
        System.out.println(list);
        return list;
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
        return list;
    }
    @Override
    public Questions findQuestionsById(String qType,int questionId){
        String type=SelectTableUtils.selectT(qType);
        System.out.println("type"+type);
        System.out.println("qtype"+qType);
        return makePaperDao.findQuestionsById(type,questionId);
    }
    @Override
    public Map makePaper(String type, int num0,int num1,int num2,int num3) {
        Map map=new HashMap();
        System.out.println(type);
        List<Questions> list0 = new ArrayList<>();
        List<Questions> list1 = new ArrayList<>();
        List<Questions> list2 = new ArrayList<>();
        List<Questions> list3 = new ArrayList<>();
        list0=makePaperDao.makePaperFind(type,"questions_fill");
        list1=makePaperDao.makePaperFind(type,"questions_single");
        list2=makePaperDao.makePaperFind(type,"questions_multiple");
        list3=makePaperDao.makePaperFind(type,"questions_subjective");
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
            }
            map.put("questions_fill",list);
        }
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
            }
            map.put("questions_single",list);
        }
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
            }
            map.put("questions_multiple",list);
        }
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
            }
            map.put("questions_subjective",list);
        }
        return map;
    }

    }
