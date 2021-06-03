package com.hengzhi.service;

import com.hengzhi.dto.ManagerPaper.ChangePapers;
import com.hengzhi.dto.ManagerPaper.UnChangePapers;
import com.hengzhi.dto.ManagerPaper.UnFinishPapers;

import java.util.List;

public interface ManagerPaperService {
    /*
    待改试卷数据
     */
    List<UnChangePapers> selectUnChange();
    /*
    待改试卷的份数
     */
    int selectUnChangeNumber();
    /*
     已改试卷数据
      */
    List<ChangePapers> selectChange();
    /*
      未考试卷信息
       */
    List<UnFinishPapers> selectUnFinish();
}
