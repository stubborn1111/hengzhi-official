package com.hengzhi.dao;

import com.hengzhi.dto.paperAndTest.*;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Jane
 * @version 1.0
 * @description 学生试卷和考试数据库访问层
 * @Date 2021/5/29
 */
@Mapper
@Repository
public interface StudentTestDao {
    /**
     * 获取试卷id
     *
     * @param code
     * @return
     */
    GetPaper selectPaperIdByCode(String code);

    /**
     * 用户获得试卷
     *
     * @param paperId
     * @return
     */
    void addUserPaper(Integer paperId,Integer userId);

    /**
     * 获得用户未考试卷信息
     *
     * @param userId
     * @return
     */
    List<UntestedPaper> getUntestedPapers(Integer userId);

    /**
     * 获得用户已考试卷信息
     *
     * @param userId
     * @return
     */
    List<TestedPaper> getTestedPapers(Integer userId);

    /**
     * 获取试卷信息
     *
     * @param paperId
     * @return
     */
    PaperInformation getPaperInformation(Integer paperId,Integer userId);

    /**
     * 根据对应的题目id和数据库表名获取试卷的试题
     *
     * @param questionId
     * @param tName
     * @return
     */
    TestedQuestion getQuestion(Integer questionId, String tName);

    /**
     * 获得题目信息
     *
     * @param paperId
     * @return
     */
    List<QInfo> getQInfo(Integer paperId);

    /**
     * 获得用户答题情况
     *
     * @param paperId
     * @return
     */
    List<AnswerSituation> getAnswerSituation(Integer paperId, Integer userId);

    /**
     * 获得考试的试题
     *
     * @param questionId
     * @return
     */
    String getTestQuestions(Integer questionId, String tName);

    /**
     * 获得考试的试卷信息
     *
     * @param paperId
     * @return
     */
    TestPaperInfo getTestPaperInfo(Integer paperId);

    /**
     * 提交试卷答案
     *
     * @param answerList
     */
    Integer submitPaper(Integer paperId, Integer userId, List<QuestionAnswer> answerList);


    /**
     * 提交试卷得分和答题时间
     *
     * @param paperId
     * @param userId
     * @param answerTime
     * @param score
     * @return
     */
    Integer submitPaperInfo(Integer paperId, Integer userId, Integer answerTime, Integer score);

    /**
     * 提交每题的分数
     */
    Integer setScore(Integer score, Integer paperId, Integer userId, Integer qNumber);

    /**
     * 提交用户试卷的总分，不包括填空题和主观题
     *
     * @param sum
     * @param paperId
     * @param userId
     * @return
     */
    Integer setSum(Integer sum, Integer paperId, Integer userId,Integer answerTime);

    /**
     * 题目正确，修改人数
     * @param questionId
     * @param tName
     * @return
     */
    Integer updateNumber(Integer questionId,String tName);

    /**
     * 题目错误，修改人数
     * @param questionId
     * @param tName
     * @return
     */
    Integer updateNumberFalse(Integer questionId,String tName);

}
