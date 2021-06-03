package com.hengzhi.dao;

import com.hengzhi.entity.Message;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
@Mapper
@Repository
public interface GeneralManagerDao {

    /*
    返回未审核的留言列表
     */
    public List<Message> selectUnExam();
    /*
    返回未审核的留言数目
     */
    public Integer SelectCountUnExam();
}
