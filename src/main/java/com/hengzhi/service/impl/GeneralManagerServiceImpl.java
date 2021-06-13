package com.hengzhi.service.impl;

import com.github.pagehelper.PageHelper;
import com.hengzhi.dao.GeneralManagerDao;
import com.hengzhi.entity.Message;
import com.hengzhi.service.GeneralManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GeneralManagerServiceImpl implements GeneralManagerService {

    @Autowired
    GeneralManagerDao generalManagerDao;

    @Override
    public List<Message> selectUnExamMeg(int page, int size) {
        PageHelper.startPage(page, size);//使用分页插件，最核心的一句，即开启分页
        System.out.println("list");
        List<Message> list = generalManagerDao.selectUnExam();
        System.out.println(list);
        return list;
    }

    @Override
    public Integer SelectCountUnExam() {
        Integer number =  generalManagerDao.SelectCountUnExam();
        return number;
    }
    
    @Override
    public void approved(Integer messageId) {
        generalManagerDao.approved(messageId);
    }

    @Override
    public void rejectReview(Integer messageId) {
        generalManagerDao.rejectReview(messageId);
    }

}
