package com.hengzhi.service;

import com.hengzhi.entity.Data;
import com.hengzhi.entity.Introduction;
import com.hengzhi.entity.Message;
import com.hengzhi.entity.Notice;

import java.util.List;

public interface ShowService {

    /*
    返回通过的留言列表
    */
    public List<Message> selectThroughMes(int page, int size);
    /*
    返回通过的留言数目
     */
    public Integer selectCountThroughMes();
    public void InsertMessages(String content);
    public void insertNotice(String notice,int userId);
    public List<Notice> showNotice();
    public void updateIntroduction(String teamIntroduction,String behind,String front);
    public Introduction showIntroduction();
    public void addFile(int userId,String description,String url);
    public List<Data> showFile();
}
