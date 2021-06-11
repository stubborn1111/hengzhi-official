package com.hengzhi.dao;

import com.hengzhi.entity.Message;
import org.apache.ibatis.annotations.Mapper;
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
    void insertMessages(String content);
}
