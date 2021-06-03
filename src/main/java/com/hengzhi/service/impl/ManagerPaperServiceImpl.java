package com.hengzhi.service.impl;

import com.hengzhi.dao.ManagerPaperDao;
import com.hengzhi.dto.ManagerPaper.ChangePapers;
import com.hengzhi.dto.ManagerPaper.UnChangePapers;
import com.hengzhi.dto.ManagerPaper.UnFinishPapers;
import com.hengzhi.service.ManagerPaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagerPaperServiceImpl implements ManagerPaperService {

    @Autowired
    ManagerPaperDao managerPaperDao;

    @Override
    public List<UnChangePapers> selectUnChange() {
        List<UnChangePapers> list = managerPaperDao.selectUnChange();
        return list;
    }

    @Override
    public int selectUnChangeNumber() {
        Integer number = managerPaperDao.selectUnChangeNumber();
        return number;
    }

    @Override
    public List<ChangePapers> selectChange() {
        List<ChangePapers> list = managerPaperDao.selectChange();
        return list;
    }

    @Override
    public List<UnFinishPapers> selectUnFinish() {
        List<UnFinishPapers> list = managerPaperDao.selectUnFinish();
        return list;
    }
}
