package com.hengzhi.dao;

import com.hengzhi.entity.Data;
import com.hengzhi.entity.Introduction;
import com.hengzhi.entity.Message;
import com.hengzhi.entity.Notice;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ShowDao {
    /*
  返回通过的留言列表
 */
    List<Message> selectThroughMessages();
    /*
    返回通过的留言数目
     */
    int selectCountThroughMessages();
    /*
    发布留言
    */
    void insertMessages(String content);
    /*
    发布公告
    */
    void insertNotice(int userId,String content);
     /*
    显示公告
     */
     List<Notice> showNotice();
     void updateIntroduction(String teamIntroduction,String behind,String front);
     Introduction showIntroduction();
     void addFile(int userId,String description,String url);
     List<Data> showFile();
}
