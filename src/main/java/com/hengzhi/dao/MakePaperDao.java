package com.hengzhi.dao;

import com.hengzhi.dto.paperAndTest.MybatisData;
import com.hengzhi.dto.paperAndTest.Tag;
import com.hengzhi.entity.*;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

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
    List<Tag> findTagFuzzy(String tagName);
    List<Questions> findQuestionByTypeAndTag(MybatisData data);
}
