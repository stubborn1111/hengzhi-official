package com.hengzhi.service.impl;

import com.github.pagehelper.PageHelper;
import com.hengzhi.dao.GeneralManagerDao;
import com.hengzhi.dao.ShowDao;
import com.hengzhi.dao.UserDao;
import com.hengzhi.dto.userBasic.UserInfo;
import com.hengzhi.entity.*;
import com.hengzhi.service.GeneralManagerService;
import com.hengzhi.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShowServiceImpl implements ShowService {

    @Autowired
    ShowDao showDao;
    @Autowired
    UserDao userDao;

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
    @Override
    public void insertNotice(String notice,int userId){
        UserInfo user=userDao.getUserInfo(userId);
        showDao.insertNotice(user.getName(),notice);
    }
    @Override
    public List<Notice> showNotice(){
        return showDao.showNotice();
    }
    @Override
    public void updateIntroduction(String teamIntroduction,String behind,String front){
        showDao.updateIntroduction(teamIntroduction,behind,front);
    }
    @Override
    public Introduction showIntroduction(){
        return showDao.showIntroduction();
    }
    @Override
    public void addFile(int userId,String description,String url){
        showDao.addFile(userId,description,url);
    }
    @Override
    public List<Data> showFile(){
        return showDao.showFile();
    }

}
