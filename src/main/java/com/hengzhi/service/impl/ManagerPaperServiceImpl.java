package com.hengzhi.service.impl;

import com.github.pagehelper.PageHelper;
import com.hengzhi.dao.ManagerPaperDao;
import com.hengzhi.dto.ManagerPaper.*;
import com.hengzhi.service.ManagerPaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

@Service
public class ManagerPaperServiceImpl implements ManagerPaperService {

    @Autowired
    ManagerPaperDao managerPaperDao;

    @Override
    public List<UnChangePapers> selectUnChange(Integer page,Integer size) {
        PageHelper.startPage(page, size);
        List<UnChangePapers> list = managerPaperDao.selectUnChange();
        return list;
    }

    @Override
    public int selectUnChangeNumber() {
        Integer number = managerPaperDao.selectUnChangeNumber();
        return number;
    }

    @Override
    public List<ChangePapers> selectChange(Integer page,Integer size) {
        PageHelper.startPage(page, size);
        List<ChangePapers> list = managerPaperDao.selectChange();
        return list;
    }

    @Override
    public Integer selectChangeNumber() {
        Integer num = managerPaperDao.selectChangeNumber();
        return num;
    }

    @Override
    public List<UnFinishPapers> selectUnFinish(Integer page,Integer size) {
        PageHelper.startPage(page, size);
        List<UnFinishPapers> list = managerPaperDao.selectUnFinish();
        return list;
    }

    @Override
    public Integer selectUnFinishNumber() {
        Integer num = managerPaperDao.selectUnFinishNumber();
        return num;
    }

    @Override
    public List<ScoreInformation> selectScoreInformation(Integer paperId) {
        List<ScoreInformation> scoreInformations = managerPaperDao.selectScoreInformation(paperId);
        return scoreInformations;
    }

    @Override
    public int selectSumScore(Integer paperId) {
        Integer sum = managerPaperDao.selectSumScore(paperId);
        return sum;
    }

    @Override
    public int selectSumPeople(Integer paperId) {
        Integer count = managerPaperDao.selectSumPeople(paperId);
        return count;
    }

    @Override
    public void unTestPaper(UnTestPaper unTestPaper) {
        managerPaperDao.unTestPaper(unTestPaper);
    }

    @Override
    public List<UnCorrectStudentList> unCorrectStudent1(Integer paperId,Integer page, Integer size) {
        PageHelper.startPage(page, size);
        List<UnCorrectStudentList> lists = managerPaperDao.unCorrectStudent(paperId);
        return lists;
    }

    @Override
    public Integer selectAllPeople(Integer paperId) {
        Integer Sum = managerPaperDao.selectAllPeople(paperId);
        return Sum;
    }

    @Override
    public Integer selectCorrect(Integer paperId) {
        Integer number = managerPaperDao.selectCorrect(paperId);
        return number;
    }

    @Override
    public ArrayList selectType(Integer paperId) {
        ArrayList list = managerPaperDao.selectType(paperId);
        return list;
    }

    @Override
    public ArrayList selectQuestionId(Integer paperId) {
        ArrayList list = managerPaperDao.selectQuestionId(paperId);
        return list;
    }

    @Override
    public List<SubjectContent> selectSubjectContentFill(Integer questionId,Integer paperId) {
        List<SubjectContent> list = managerPaperDao.selectSubjectContentFill(questionId,paperId);
        return list;
    }

    @Override
    public List<SubjectContent> selectSubjectContentSingle(Integer questionId,Integer paperId) {
        List<SubjectContent> list = managerPaperDao.selectSubjectContentSingle(questionId,paperId);
        return list;
    }

    @Override
    public List<SubjectContent> selectSubjectContentMultiple(Integer questionId,Integer paperId) {
        List<SubjectContent> list = managerPaperDao.selectSubjectContentMultiple(questionId,paperId);
        return list;
    }

    @Override
    public List<SubjectContent> selectSubjectContentSubjective(Integer questionId,Integer paperId) {
        List<SubjectContent> list = managerPaperDao.selectSubjectContentSubjective(questionId,paperId);
        return list;
    }

    @Override
    public void updateAnswerPaper(Integer score, Integer paperId, Integer userId, Integer qNumber) {
        managerPaperDao.updateAnswerPaper(score,paperId,userId,qNumber);
    }

    @Override
    public Integer selectSum1(Integer userId, Integer paperId) {
        Integer sum = managerPaperDao.selectSum1(userId,paperId);
        return sum;
    }

    @Override
    public void updateSum(Integer score, Integer userId, Integer paperId) {
        managerPaperDao.updateSum(score,userId,paperId);
    }
}
