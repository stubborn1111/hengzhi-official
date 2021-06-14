package com.hengzhi.dao;

import com.hengzhi.entity.Data;
import com.hengzhi.entity.Introduction;
import com.hengzhi.entity.Message;
import com.hengzhi.entity.Notice;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface MakePaperDao {
    void addQuestions(String qType,String kind,int userId,String content,String answer,String description);

}
