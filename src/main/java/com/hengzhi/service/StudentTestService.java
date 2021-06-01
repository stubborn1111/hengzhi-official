package com.hengzhi.service;

import java.util.List;
import java.util.Map;

/**
 * @author Jane
 * @version 1.0
 * @description
 * @Date 2021/5/23
 */
public interface StudentTestService {
    Integer getPaper(String code);

    List getUntestedPapers(Integer studentId);

    List getTestedPapers(Integer studentId);

    Map viewTestedPaper(Integer paperId, Integer studentId);

    Map test(Integer paperId);

    boolean submitPaper(Map map);
}
