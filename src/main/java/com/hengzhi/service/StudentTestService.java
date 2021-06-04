package com.hengzhi.service;

import com.alibaba.fastjson.JSONObject;
import com.hengzhi.dto.paperAndTest.GetPaper;

import java.util.List;
import java.util.Map;

/**
 * @author Jane
 * @version 1.0
 * @description
 * @Date 2021/5/23
 */
public interface StudentTestService {
    GetPaper getPaper(String code, Integer userId);

    List getUntestedPapers(Integer studentId);

    List getTestedPapers(Integer studentId);

    Map viewTestedPaper(Integer paperId, Integer studentId);

    Map test(Integer paperId);

    boolean submitPaper(JSONObject jsonObject);


}
