package com.hengzhi.controller;

import com.alibaba.fastjson.JSONObject;
import com.hengzhi.entity.Introduction;
import com.hengzhi.entity.Message;
import com.hengzhi.entity.Notice;
import com.hengzhi.entity.User;
import com.hengzhi.secutity.Security;
import com.hengzhi.service.GeneralManagerService;
import com.hengzhi.service.ManagerPaperService;
import com.hengzhi.service.ShowService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RequestMapping("/show")
@Controller
@CrossOrigin(origins = "*",maxAge = 3600)
public class ShowController {
    @Autowired
    ShowService showService;
    @RequestMapping("/showMessages")
    @ResponseBody
    @Security(false)
    public Map showMessages(@RequestBody JSONObject jsonObject){
        Integer page = jsonObject.getInteger("page");
        Integer size = jsonObject.getInteger("size");
        Map map = new HashMap();
        List<Message> list = showService.selectThroughMes(page,size);
        Integer TotalNumber = showService.selectCountThroughMes();
        Double all= Math.ceil((float)TotalNumber/size);
        int allP=all.intValue();
        if(page<=allP)
        map.put("listMessage",list);
        else map.put("listMessage",null);
        map.put("TotalNumber",TotalNumber);
        if(TotalNumber<size){
            map.put("pagesSize",1);
        } else if(TotalNumber%size==0){
            map.put("pagesSize",TotalNumber/size);
        }else {
            map.put("pagesSize",TotalNumber/size+1);
        }
        map.put("page",page);
        return map;
    }
//    增加留言
    @RequestMapping("/addMessages")
    @ResponseBody
    @Security(false)
    public HashMap addMessages(@RequestBody JSONObject jsonObject) {
        String content=jsonObject.getString("content");
        showService.InsertMessages(content);
        HashMap map=new HashMap();
        map.put("msg","success");
        return map;
    }
//    发布公告
    @ResponseBody
    @RequestMapping("/addNotice")
    @RequiresRoles(value = {"admin"})
    public HashMap addNotice(@RequestBody JSONObject jsonObject){
        int userId=jsonObject.getInteger("userId");
        String content=jsonObject.getString("content");
        showService.insertNotice(content,userId);
        HashMap map=new HashMap();
        map.put("msg","success");
        return map;
    }
//    显示公告
    @RequestMapping("/showNotice")
    @ResponseBody
    @Security(false)
    public List<Notice> showNotice(){
        return showService.showNotice();
    }
    //    修改简介
    @ResponseBody
    @RequestMapping("/updateIntroduction")
    @RequiresRoles(value = {"super"})
    public HashMap updateIntroduction(@RequestParam(value = "teamIntroduction")String teamIntroduction,@RequestParam(value = "front")String front,@RequestParam(value = "behind")String behind, HttpServletRequest request){
            showService.updateIntroduction(teamIntroduction,behind,front);
            HashMap map=new HashMap();
            map.put("msg","success");
            return map;
    }

//    显示简介
    @RequestMapping("/showIntroduction")
    @ResponseBody
    @Security(false)
    public Introduction showIntroduction(){
        return showService.showIntroduction();
    }
//    上传资料
    @ResponseBody
    @RequestMapping("/uploadFile")
    @RequiresRoles(value = {"admin"})
    public HashMap uploadFile(@RequestParam(value = "userId")int userId,@RequestParam(value = "description")String description, @RequestParam(value = "file",required = false)MultipartFile file,HttpServletRequest request){
        HashMap map=new HashMap();
        if (!file.isEmpty()) {
            String filePath = request.getServletContext().getRealPath("/file");
            System.out.println(request.getContextPath());
            String originalFilename = file.getOriginalFilename();
            // UUID随机重命名
           String url = (UUID.randomUUID() + originalFilename
                    .substring(originalFilename.indexOf("."))).replace("-", "");
            // 新文件
            File file1 = new File(filePath, url);
            // 将文件写入磁盘
            try {
                if (!file1.exists()) {
                    file1.mkdirs();
                }
                file.transferTo(file1);

            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }
            showService.addFile(userId,description,url);

            map.put("msg","success");
    }
        else map.put("msg","error");
        return map;
    }
//    文件下载
    @RequestMapping("/downloadFile")
    @ResponseBody
    @RequiresRoles(value = {"admin","user","super"}, logical = Logical.OR)
    public HashMap downloadFile(@RequestParam(value = "fileName")String fileName, HttpServletResponse response,HttpServletRequest request) throws IOException {
        String filePath = request.getServletContext().getRealPath("/file");
            File file = new File(filePath+"/"+fileName);
            HashMap map=new HashMap();
        if (!file.exists()) {
            response.sendError(404, "File not found!");
            map.put("msg","error");
        }
        BufferedInputStream br = new BufferedInputStream(new FileInputStream(file));
        byte[] buf = new byte[1024];
        int len = 0;

        response.reset(); // 非常重要
         // 纯下载方式
            response.setContentType("application/x-msdownload");
            response.setHeader("Content-Disposition", "attachment; filename=" + file.getName());

        OutputStream out = response.getOutputStream();
        while ((len = br.read(buf)) > 0)
            out.write(buf, 0, len);
        br.close();
        out.close();
        map.put("msg","success");
        return map;
    }
//    资料列表
    @RequestMapping("/showFile")
    @ResponseBody
    @RequiresRoles(value = {"admin","user","super"}, logical = Logical.OR)
    public List showFile(){
        return showService.showFile();
    }

    }



