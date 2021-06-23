package com.hengzhi.dao;

import com.hengzhi.dto.paperAndTest.MybatisData;
import com.hengzhi.dto.paperAndTest.Tag;
import com.hengzhi.entity.*;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Mapper
@Repository
public interface MakePaperDao {
    void addQuestions(String qType,String kind,int userId,String content,String answer,String description);
    List<Questions> showQuestions1();
    int showQNumber1();
    List<Questions> showQuestions2();
    int showQNumber2();
    List<Questions> showQuestions3();
    int showQNumber3();
    List<Questions> showQuestions4();
    int showQNumber4();
    void addTag(String tagName);
    Tag findTag(String tagName);
    List<String> findAllTag();
    List<Tag> findTagFuzzy(String tagName);
    List<Questions> findQuestionsByKeyWords(String keyWord,String qType);
    List<Questions> findQuestionByTag1(List list);
    List<Questions> findQuestionByTag2(List list);
    List<Questions> findQuestionByTag3(List list);
    List<Questions> findQuestionByTag4(List list);
    Questions findQuestionsById(String qType,int questionId);
    List<Questions> makePaperFind(String type,String qType);
    void addPaper(Date beginTime, Date endTime,String paperName,int userId,String description,String code,int score);
    Papers findPaperByCode(String code);
    void addQuestionsInPaper(int paperId,int qNumber,int questionId,String qType);
}
