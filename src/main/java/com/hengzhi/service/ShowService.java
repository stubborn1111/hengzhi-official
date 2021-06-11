package com.hengzhi.service;

import com.hengzhi.entity.Message;

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
}
