package com.hengzhi.service;

import com.hengzhi.dto.ManagerPaper.*;

import java.util.ArrayList;
import java.util.List;

public interface ManagerPaperService {
    /*
    待改试卷数据
     */
    List<UnChangePapers> selectUnChange();
    /*
    待改试卷的份数
     */
    int selectUnChangeNumber();
    /*
     已改试卷数据
      */
    List<ChangePapers> selectChange();
    /*
      未考试卷信息
       */
    List<UnFinishPapers> selectUnFinish();
    /*
     考试试卷信息
      */
    List<ScoreInformation> selectScoreInformation(Integer paperId);
    /*
    计算每一张试卷的总分
     */
    int selectSumScore(Integer paperId);
    /*
    计算考试人数
     */
    int selectSumPeople(Integer paperId);
    /*
    修改未考试卷信息
     */
    void unTestPaper(UnTestPaper unTestPaper);
    /*
   返回前端为批改试卷学生的答案
    */
    List<UnCorrectStudentList> unCorrectStudent1(Integer paperId,Integer page, Integer size);
    /*
    返回答题人数
     */
    Integer selectAllPeople(Integer paperId);
    /*
    返回已经批改数目
     */
    Integer selectCorrect(Integer paperId);
    /*
    返回题目类型
     */
    ArrayList selectType(Integer paperId);
    /*
    返回题目question_id
     */
    ArrayList selectQuestionId(Integer paperId);
    /*
    填空题
     */
    List<SubjectContent> selectSubjectContentFill(Integer questionId);
    /*
    单选
     */
    List<SubjectContent> selectSubjectContentSingle(Integer questionId);
    /*
    多选
     */
    List<SubjectContent> selectSubjectContentMultiple(Integer questionId);
    /*
    主观题
     */
    List<SubjectContent> selectSubjectContentSubjective(Integer questionId);
    /*
    接收前端的试卷批改数据
     */
    void updateAnswerPaper(Integer score,Integer paperId,Integer userId,Integer qNumber);
    /*
    取出单选和多选的总分
     */
    Integer selectSum1(Integer userId,Integer paperId);
    /*
    将总分存到user_paper
     */
    void updateSum(Integer score,Integer userId,Integer paperId);
}
