package com.hengzhi.controller;

import com.alibaba.fastjson.JSONObject;
import com.hengzhi.entity.Introduction;
import com.hengzhi.entity.Message;
import com.hengzhi.entity.Notice;
import com.hengzhi.secutity.Security;
import com.hengzhi.service.ShowService;
import com.hengzhi.service.SuperManagerService;
import com.hengzhi.service.UserService;
import com.hengzhi.utils.Paging;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RequestMapping("/super")
@Controller
@CrossOrigin(origins = "*",maxAge = 3600)
public class SuperManagerController {
    @Autowired
    SuperManagerService superManagerService;
    @RequestMapping("/addAdmin")
    @ResponseBody
    @RequiresRoles(value = {"super"})
    public Map addAdmin(@RequestBody JSONObject jsonObject){
        int userId=jsonObject.getInteger("userId");
      Map map=new HashMap();
      map.put("msg",superManagerService.addAdmin(userId));
      return map;
    }
    @RequestMapping("/deleteAdmin")
    @ResponseBody
    @RequiresRoles(value = {"super"})
    public Map deleteAdmin(@RequestBody JSONObject jsonObject){
        int userId=jsonObject.getInteger("userId");
        Map map=new HashMap();
        map.put("msg",superManagerService.deleteAdmin(userId));
        return map;
    }
    @RequestMapping("/findList")
    @ResponseBody
    @RequiresRoles(value = {"super"})
    public Map findList(@RequestBody JSONObject jsonObject){
        int page=jsonObject.getInteger("page");
        int size=jsonObject.getInteger("size");
        Map map=new HashMap();
        List list=superManagerService.findList();
        int number=superManagerService.findListNum();
        map= Paging.getPage(list,number,size,page);
        return map;
    }
    @RequestMapping("/throughAdmit")
    @ResponseBody
    @RequiresRoles(value = {"super"})
    public Map throughAdmit(@RequestBody JSONObject jsonObject){
        int userId=jsonObject.getInteger("userId");
        Map map=new HashMap();
        map.put("msg",superManagerService.updatePassword(userId));
        return map;
    }
    @RequestMapping("/rejectAdmit")
    @ResponseBody
    @RequiresRoles(value = {"super"})
    public Map rejectAdmit(@RequestBody JSONObject jsonObject){
        int userId=jsonObject.getInteger("userId");
        Map map=new HashMap();
        map.put("msg",superManagerService.rejectUpdate(userId));
        return map;
    }

    @RequestMapping("/addUser")
    @ResponseBody
    @Security(false)
    public Map addUser(@RequestBody JSONObject jsonObject){
        int studentId=jsonObject.getInteger("studentId");
        String name=jsonObject.getString("name");
        Map map=new HashMap();
        map.put("msg",superManagerService.addUser(name,studentId));
        return map;
    }

    @RequestMapping("/deleteUser")
    @ResponseBody
    @RequiresRoles(value = {"super"})
    public Map deleteUser(@RequestBody JSONObject jsonObject){
        int userId=jsonObject.getInteger("userId");
        Map map=new HashMap();
        map.put("msg",superManagerService.deleteUser(userId));
        return map;
    }
    @RequestMapping("/showAllUser")
    @ResponseBody
    @RequiresRoles(value = {"super"})
    public Map showAllUser(@RequestBody JSONObject jsonObject){
        int page=jsonObject.getInteger("page");
        int size=jsonObject.getInteger("size");
        Map map=new HashMap();
        List list=superManagerService.findAllUser();
        return Paging.getPage(list,list.size(),size,page);
    }
}



