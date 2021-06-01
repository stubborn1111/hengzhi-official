package com.hengzhi.service.impl;

import com.hengzhi.dao.StudentTestDao;
import com.hengzhi.dto.paperAndTest.*;
import com.hengzhi.entity.Questions;
import com.hengzhi.service.StudentTestService;
import com.hengzhi.utils.SelectTableUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * @author Jane
 * @version 1.0
 * @description
 * @Date 2021/5/23
 */
@Service
public class StudentTestServiceImpl implements StudentTestService {
    @Autowired
    StudentTestDao testDao;

    @Override
    public Integer getPaper(String code) {
        Integer paperId = testDao.selectPaperIdByCode(code);
        if (paperId == null) return 0;
        testDao.addUserPaper(paperId);
        return 1;
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

    @Override
    public Map viewTestedPaper(Integer paperId, Integer userId) {
        Map map = new HashMap();
        List<QInfo> qInfo = testDao.getQInfo(paperId);
        List<TestedQuestion> qList = new LinkedList<>();
        String tName;
        for (int i = 0; i < qInfo.size(); i++) {
            tName = SelectTableUtils.selectT(qInfo.get(i).getQType());
            qList.add(testDao.getQuestion(qInfo.get(i).getQuestionId(), tName));
        }
        List<AnswerSituation> answerSituation = testDao.getAnswerSituation(paperId, userId);
        PaperInformation paperInformation = testDao.getPaperInformation(paperId);
        map.put("questionList", qList);
        map.put("answerList", answerSituation);
        map.put("PaperInformation", paperInformation);
        return map;
    }

    @Override
    public Map test(Integer paperId) {
        Map map = new HashMap();
        List<QInfo> qInfo = testDao.getQInfo(paperId);
        List<TestQuestion> qList = new LinkedList<>();
        String tName = new String();
        for (int i = 0; i < qInfo.size(); i++) {
            tName = SelectTableUtils.selectT(qInfo.get(i).getQType());
            qList.add(new TestQuestion(qInfo.get(i).getQuestionId(), qInfo.get(i).getQType(), testDao.getTestQuestions(qInfo.get(i).getQuestionId(), tName)));
        }
        TestPaperInfo paperInfo = testDao.getTestPaperInfo(paperId);
        map.put("qList", qList);
        map.put("paperInfo", paperInfo);
        return map;
    }

    @Override
    public boolean submitPaper(Map map) {
        List<QuestionAnswer> answerList = (List<QuestionAnswer>) map.get("answerList");
        Integer userId = (Integer) map.get("userId");
        Integer answerTime = (Integer) map.get("answerTime");
        Integer paperId = (Integer) map.get("paperId");
        testDao.submitPaper(paperId, userId, answerList);
        List<QInfo> qInfo = testDao.getQInfo(paperId);
        for (int i = 0; i < qInfo.size(); i++) {
            if("0".equals(qInfo.get(i).getQType()))continue;
            else{
                
            }
        }
        return false;
    }
}
