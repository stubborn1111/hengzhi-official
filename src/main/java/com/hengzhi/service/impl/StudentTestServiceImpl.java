package com.hengzhi.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.hengzhi.dao.StudentTestDao;
import com.hengzhi.dto.paperAndTest.*;
import com.hengzhi.entity.Questions;
import com.hengzhi.service.StudentTestService;
import com.hengzhi.utils.SelectTableUtils;
import com.mysql.cj.xdevapi.JsonArray;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * @author Jane
 * @version 1.0
 * @description
 * @Date 2021/5/23
 */
@Slf4j
@Service
public class StudentTestServiceImpl implements StudentTestService {
    @Autowired
    StudentTestDao testDao;

    @Override
    public GetPaper getPaper(String code, Integer userId) {
        GetPaper getPaper = testDao.selectPaperIdByCode(code);
        //邀请码不存在
        if (getPaper == null) {
            return new GetPaper();
        }
        Integer integer = testDao.selectPaper(getPaper.getPaperId(), userId);
        //用户已有试卷
        if(!(integer==null)){
            GetPaper getPaper1 = new GetPaper();
            getPaper1.setPaperId(0);
            return getPaper1;
        }
        testDao.addUserPaper(getPaper.getPaperId(), userId);
        return getPaper;
    }

    @Override
    public List<UntestedPaper> getUntestedPapers(Integer userId) {
        List<UntestedPaper> papers = testDao.getUntestedPapers(userId);
        return papers;
    }

    @Override
    public List<TestedPaper> getTestedPapers(Integer userId) {
        List<TestedPaper> testedPapers = testDao.getTestedPapers(userId);
        return testedPapers;
    }

    /**
     * 查看已考试卷的内容
     *
     * @param paperId
     * @param userId
     * @return
     */
    @Override
    public Map viewTestedPaper(Integer paperId, Integer userId) {
        Map map = new HashMap();
        //根据试卷id获得试题信息：题号和类型
        List<QInfo> qInfo = testDao.getQInfo(paperId);
        List<TestedQuestion2> qList = new ArrayList<>();
        String tName;
        for (int i = 0; i < qInfo.size(); i++) {
            //根据题目类型获得表名
            tName = SelectTableUtils.selectT(qInfo.get(i).getQType());
            TestedQuestion question = testDao.getQuestion(qInfo.get(i).getQuestionId(), tName);
            question.setQType(qInfo.get(i).getQType());
            TestedQuestion2 question2 = question.transfer();
            qList.add(question2);
            //qList.add(testDao.getQuestion(qInfo.get(i).getQuestionId(),tName));
        }
        //获得答题情况
        List<AnswerSituation> answerSituation = testDao.getAnswerSituation(paperId, userId);
        //获得试卷信息
        PaperInformation paperInformation = testDao.getPaperInformation(paperId, userId);
        map.put("questionList", qList);
        map.put("answerList", answerSituation);
        map.put("PaperInformation", paperInformation);
        return map;
    }

    /**
     * 考试
     * @param paperId
     * @return
     */
    @Override
    public Map test(Integer paperId) {
        Map map = new HashMap();
        List<QInfo> qInfo = testDao.getQInfo(paperId);
        System.out.println(qInfo);
        List<TestQuestion> qList = new LinkedList<>();
        String tName;
        for (int i = 0; i < qInfo.size(); i++) {
            tName = SelectTableUtils.selectT(qInfo.get(i).getQType());
            qList.add(new TestQuestion(i+1, qInfo.get(i).getQType(), testDao.getTestQuestions(qInfo.get(i).getQuestionId(), tName)));
        }
        TestPaperInfo paperInfo = testDao.getTestPaperInfo(paperId);
        map.put("qList", qList);
        map.put("paperInfo", paperInfo);
        return map;
    }

    /**
     * 交卷
     * @param jsonObject
     * @return
     */
    @Override
    public boolean submitPaper(JSONObject jsonObject,Integer userId) {
        //答案列表
        String text = JSONArray.toJSONString(jsonObject.get("answerList"));
        List<QuestionAnswer> answerList = JSONArray.parseArray(text, QuestionAnswer.class);
        Integer answerTime = (Integer) jsonObject.get("answerTime");//答题所用时间
        Integer paperId = (Integer) jsonObject.get("paperId");
        //提交答案
        testDao.submitPaper(paperId, userId, answerList);
        //批改试卷
        List<QInfo> qInfo = testDao.getQInfo(paperId);//根据试卷id获得每题的题目id和类型
        Integer sum = 0;//总分
        Integer score = 0;//每题得分
        //开始循环批改
        for (int i = 0; i < qInfo.size(); i++) {
            //题目信息
            Integer questionId = qInfo.get(i).getQuestionId();
            String qType = qInfo.get(i).getQType();
            String tName = SelectTableUtils.selectT(qType);
            //填空题和主观题不需要批改
            if ("0".equals(qType) || "3".equals(qType)) {
                continue;
            } else {
                //适用于单选和多选
                //根据对应的题目id和数据库表名获取试题内容
                TestedQuestion testedQuestion = testDao.getQuestion(questionId, tName);
                String rAnswer = testedQuestion.getAnswer();//正确答案
                String uAnswer = answerList.get(i).getAnswer();//用户答案
                Double cRate = ((double)((int)((testedQuestion.getCorrectNumber()/1.0/testedQuestion.getTotalNumber())*100)))/100;
                testDao.updateCRate(cRate,tName,questionId);
                if (rAnswer.equals(uAnswer)) {
                    score = 5;//完全正确
                    //修改题目正确率，在试题表中修改并放到paper_content表中
                    Integer updateNumber = testDao.updateNumber(questionId, tName);
                    if (updateNumber == 0) log.info("修改正确率失败");
                    else log.error("修改正确率成功");
                } else {
                    Integer updateNumberFalse = testDao.updateNumberFalse(questionId, tName);
                    if (updateNumberFalse == 0) log.info("修改错误正确率失败");
                    else log.error("修改错误正确率成功");
                    if (!rAnswer.contains(uAnswer)) score = 0;//不包含，分数为0
                    else score = (int) ((uAnswer.length() / 1.0 / rAnswer.length()) * 5);//按比例计算分数，取整
                }
                testDao.setScore(score, paperId, userId, i + 1);
                sum += score;
            }
        }
        //提交总分和时间
        System.out.println("sum:"+sum);
        testDao.setSum(sum, paperId, userId,answerTime);
        return true;
    }
}
