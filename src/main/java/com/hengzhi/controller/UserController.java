package com.hengzhi.controller;

import com.alibaba.fastjson.JSONObject;
import com.hengzhi.dto.userBasic.UserInfo;
import com.hengzhi.secutity.Security;
import com.hengzhi.service.JWTService;
import com.hengzhi.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.hengzhi.entity.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * @author Jane
 * @version 1.0
 * @description 用户相关控制器
 * @Date 2021/5/22
 */
@Slf4j
@CrossOrigin(origins = "*",maxAge = 3600)
@RequestMapping("/user")
@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private JWTService jwtService;

    /**
     * 登陆
     * @param user
     * @param response
     * @return
     */
    @RequestMapping("/login")
    @ResponseBody
    @Security(false)
    public Map<String, String> login(@RequestBody User user, HttpServletResponse response) {
        Map<String, String> map = new HashMap();
        map.put("status", "error");
        User userDB = userService.login(user);
        System.out.println(userDB);
        if (userDB != null) {
            String token = jwtService.generateJWTToken(userDB);
            response.setHeader("Authorization", token);
            map.put("status", "success");
            return map;
        }
        log.info("/user/login"+map.toString());
        return map;
    }

    /**
     * 修改头像
     * @param studentId
     * @param headImage
     * @param request
     * @return
     */
    @RequestMapping("/updateHeadImg")
    @ResponseBody
    @Security
    @RequiresRoles(value = {"user", "admin"}, logical = Logical.OR)
    public Map<String, String> updateHeadImg(@RequestParam Integer studentId, @RequestParam(value = "headImage", required = false) MultipartFile headImage, HttpServletRequest request) {
        Map<String, String> map = new HashMap<>();
        //如果文件不为空
        if (!headImage.isEmpty()) {
            String filePath = request.getServletContext().getRealPath("/headImage");
            String originalFilename = headImage.getOriginalFilename();
            // UUID随机重命名
            String newFileName = (UUID.randomUUID() + originalFilename
                    .substring(originalFilename.indexOf("."))).replace("-", "");
            // 新文件
            File file = new File(filePath, newFileName);
            // 将文件写入磁盘
            try {
                if (!file.exists()) {
                    file.mkdirs();
                }
                headImage.transferTo(file);
                // 将图片名字写入数据库
                User user = new User();
                user.setStudentId(studentId);
                user.setHeadImg(newFileName);
                userService.updateHeadImg(user);
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }
            map.put("status", "success");
            map.put("newFileName", newFileName);
            log.info("/user/updateHeadImg"+map.toString());
            return map;
        } else {
            log.info("/user/updateHeadImg"+map.toString());
            map.put("status", "error");
            map.put("newFileName","");
            return map;
        }
    }

    /**
     * 修改密码
     * @param jsonObject
     * @param request
     * @return
     */
    @RequestMapping("/updatePassword")
    @ResponseBody
    @RequiresRoles(value = {"user", "admin"}, logical = Logical.OR)
    public Map<String, String> updatePassword(@RequestBody JSONObject jsonObject, HttpServletRequest request) {
        Map<String, String> map = new HashMap<>();
        Integer studentId = jsonObject.getInteger("studentId");
        String password = jsonObject.getString("password");
        String newPassword = jsonObject.getString("newPassword");
        Integer realSId = jwtService.getStudentId(request);
        if (!realSId.equals(studentId)) {
            map.put("status", "error");
            map.put("msg", "您只能修改自己的密码");
            log.info("/user/updatePassword"+map.toString());
            return map;
        }
        int i = userService.updatePassword(studentId, password, newPassword);
        if (i == 0) {
            map.put("status", "success");
            map.put("msg", "修改成功");
        } else {
            map.put("status", "error");
            map.put("msg", "原密码错误");
        }
        log.info("/user/updatePassword"+map.toString());
        return map;
    }

    /**
     * 提交忘记密码
     * @param jsonObject
     * @return
     */
    @ResponseBody
    @RequestMapping("/forgetPassword")
    @RequiresRoles(value = {"user", "admin"}, logical = Logical.OR)
    public Map<String, String> submitForgetPassword(@RequestBody JSONObject jsonObject) {
        Map<String, String> map = new HashMap<>();
        Integer studentId = jsonObject.getInteger("studentId");
        String newPassword = jsonObject.getString("newPassword");
        int i = userService.submitForgetPassword(studentId, newPassword);
        if (i == 0) {
            map.put("status", "error");
            map.put("msg", "不存在此用户");
        } else {
            map.put("status", "success");
            map.put("msg", "提交成功");
        }
        log.info("/user/forgetPassword"+map.toString());
        return map;
    }

    /**
     *获取用户信息
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping("/getUserInfo")
    @Security(false)
    public UserInfo getUserInfo(HttpServletRequest request) {
        //可能发生两种情况的异常，jwt失效或没有
        try{
            Integer userId = jwtService.getUserId(request);
             UserInfo userInfo = new UserInfo();
            if (userId!=null){
                userInfo = userService.getUserInfo(userId);
                return userInfo;
            }
            log.debug("jwt失效");
            return userInfo;
        } catch (Exception e){
            log.debug("无jwt");
            return new UserInfo();
        }
    }
}
