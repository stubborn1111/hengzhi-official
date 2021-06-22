package com.hengzhi.service.impl;

import com.hengzhi.dao.SuperManagerDao;
import com.hengzhi.dao.UserDao;
import com.hengzhi.dto.userBasic.UserInfo;
import com.hengzhi.entity.User;
import com.hengzhi.secutity.BCryptPasswordEncoder;
import com.hengzhi.service.SuperManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuperManagerServiceImpl implements SuperManagerService {

    @Autowired
    SuperManagerDao superManagerDao;
    @Autowired
    UserDao userDao;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Override
    public String addAdmin(int userId){
      UserInfo user=userDao.getUserInfo(userId);
      String role=user.getPower();
      if(role.equals("admin")) return "already";
      else {
          superManagerDao.addAdmin(userId);
          return "success";
      }
    }

    @Override
    public String deleteAdmin(int userId){
        UserInfo user=userDao.getUserInfo(userId);
        String role=user.getPower();
        if(!role.equals("admin")) return "not yet";
        else {
            superManagerDao.deleteAdmin(userId);
            return "success";
        }
    }
    @Override
    public List findList(){
        return superManagerDao.findList();
    }
    @Override
    public int findListNum(){
        return superManagerDao.findListNum();
    }
    @Override
    public String updatePassword(int userId){
       User user=userDao.selectUserByUserId(userId);
       if(user.getRequired().equals("0")) return "error";
       else {
           String pass=user.getRequired();
           String password=bCryptPasswordEncoder.encode(pass);
           superManagerDao.updatePassword(userId,password);
           return "success";
       }

    }
    @Override
    public String rejectUpdate(int userId){
        User user=userDao.selectUserByUserId(userId);
        if(user.getRequired().equals("0")) return "error";
        else {
            superManagerDao.rejectUpdate(userId);
            return "success";
        }
    }

@Override
public String addUser(String name,int studentId){
    User user=superManagerDao.findUserByStudentId(studentId);
    if(user!=null) return "exist";
    else {
        String password1=String.valueOf(studentId);
        String password=password1.substring(4);
        String encodePas= bCryptPasswordEncoder.encode(password);
        superManagerDao.addUser(encodePas,name,studentId);
        String userPas=userDao.selectUserByStudentId(studentId);
        return "success";
    }
}
    @Override
    public String deleteUser(int userId){
        UserInfo user=userDao.getUserInfo(userId);
        if(user==null) return "error";
        else {
           superManagerDao.deleteUser(userId);
            return "success";
        }
    }
    @Override
    public List findAllUser(){
        return userDao.findAllUser();
    }

    @Override
    public Integer getRPNumber() {
        Integer rpNumber = superManagerDao.getRPNumber();
        return rpNumber;
    }
}
