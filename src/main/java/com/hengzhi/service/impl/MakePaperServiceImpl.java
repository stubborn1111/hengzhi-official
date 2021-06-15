package com.hengzhi.service.impl;

import com.github.pagehelper.PageHelper;
import com.hengzhi.dao.MakePaperDao;
import com.hengzhi.dao.ShowDao;
import com.hengzhi.dto.paperAndTest.Tag;
import com.hengzhi.entity.*;
import com.hengzhi.service.MakePaperService;
import com.hengzhi.service.ShowService;
import com.hengzhi.utils.SelectTableUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

}
