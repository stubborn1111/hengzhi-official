package com.hengzhi.service.impl;

import com.github.pagehelper.PageHelper;
import com.hengzhi.dao.GeneralManagerDao;
import com.hengzhi.dao.ShowDao;
import com.hengzhi.entity.Message;
import com.hengzhi.service.GeneralManagerService;
import com.hengzhi.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShowServiceImpl implements ShowService {

    @Autowired
    ShowDao showDao;


    @Override
    public List<Message> selectThroughMes(int page, int size) {
        PageHelper.startPage(page, size);//使用分页插件，最核心的一句，即开启分页
        System.out.println("list");
        List<Message> list = showDao.selectThroughMessages();
        System.out.println(list);
        return list;
    }

    @Override
    public Integer selectCountThroughMes() {
        Integer number =  showDao.selectCountThroughMessages();
        return number;
    }
    @Override
    public void InsertMessages(String content){
        showDao.insertMessages(content);
    }


}
