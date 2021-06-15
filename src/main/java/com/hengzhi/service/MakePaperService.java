package com.hengzhi.service;

import com.hengzhi.dto.paperAndTest.Tag;
import com.hengzhi.entity.*;

import java.util.List;
import java.util.Map;

public interface MakePaperService {
    public void addQuestions(String type,String kind,int userId,String content,String answer,String description);
    public List<Questions> showQuestions();
    public Integer showQNumber();
    public String addTag(String tagName);
    public List findTagFuzzy(String tagName);
    public List findQuestions(List<String> tList, List<String> sList);
    public Questions findQuestionsById(String qType,int questionId);
    public Map makePaper(String type, int num0, int num1, int num2, int num3);

}
