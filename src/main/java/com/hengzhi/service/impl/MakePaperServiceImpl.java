package com.hengzhi.service.impl;

import com.github.pagehelper.PageHelper;
import com.hengzhi.dao.MakePaperDao;
import com.hengzhi.dao.ShowDao;
import com.hengzhi.entity.Data;
import com.hengzhi.entity.Introduction;
import com.hengzhi.entity.Message;
import com.hengzhi.entity.Notice;
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


}
