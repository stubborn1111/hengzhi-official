package com.hengzhi.service;

import com.hengzhi.dto.ManagerPaper.UnChangePapers;

import java.util.List;

public interface ManagerPaperService {
    /*
    待改试卷数据
     */
    List<UnChangePapers> selectUnChange();
}
