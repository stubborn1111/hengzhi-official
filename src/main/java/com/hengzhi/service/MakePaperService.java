package com.hengzhi.service;

import com.hengzhi.entity.Data;
import com.hengzhi.entity.Introduction;
import com.hengzhi.entity.Message;
import com.hengzhi.entity.Notice;

import java.util.List;

public interface MakePaperService {
    public void addQuestions(String type,String kind,int userId,String content,String answer,String description);
}
