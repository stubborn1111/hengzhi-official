package com.hengzhi.controller;

import com.hengzhi.dto.ManagerPaper.ChangePapers;
import com.hengzhi.dto.ManagerPaper.UnChangePapers;
import com.hengzhi.dto.ManagerPaper.UnFinishPapers;
import com.hengzhi.service.ManagerPaperService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.w3c.dom.ls.LSInput;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/managerPaper")
@Controller
public class ManagerPaperController {

    @Autowired
    ManagerPaperService managerPaperService;


    /*
    待改试卷
     */
    @ResponseBody
    @RequestMapping("/unChange")
    @RequiresRoles(value = {"admin"})
    public Map unChange(){
        Map map = new HashMap();
        List<UnChangePapers> list = managerPaperService.selectUnChange();
        map.put("list",list);
        Integer totalNumber = managerPaperService.selectUnChangeNumber();
        map.put("totalNumber",totalNumber);
        return  map;
    }

    /*
    已改试卷信息
     */
    @ResponseBody
    @RequestMapping("/selectChange")
    @RequiresRoles(value = {"admin"})
    public Map selectChange(){
        Map map = new HashMap();
        List<ChangePapers> list = managerPaperService.selectChange();
        map.put("list",list);
        return map;
    }

    /*
   未考试卷数据
    */
    @ResponseBody
    @RequestMapping("/selectUnFinish")
    @RequiresRoles(value = {"admin"})
    public Map selectUnFinish(){
        Map map = new HashMap();
        List<UnFinishPapers> list = managerPaperService.selectUnFinish();
        map.put("list",list);
        return map;
    }
}
