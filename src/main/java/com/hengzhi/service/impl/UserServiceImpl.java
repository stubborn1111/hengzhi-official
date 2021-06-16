package com.hengzhi.service.impl;

import com.hengzhi.dao.UserDao;
import com.hengzhi.dto.userBasic.UserInfo;
import com.hengzhi.entity.User;
import com.hengzhi.secutity.BCryptPasswordEncoder;
import com.hengzhi.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Jane
 * @version 1.0
 * @description
 * @Date 2021/6/2
 */
@Slf4j
@Service
public class UserServiceImpl implements UserService {
    @Resource
    UserDao userDao;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    /**
     * 登陆
     * @param user
     * @return
     */
    @Override
    public User login(User user) {
        User userDB = userDao.selectUserByStudentId1(user.getStudentId());
        return userDB;
    }

    @Override
    public int updateHeadImg(User user) {
        return userDao.updateByStudentId(user);
    }

    @Override
    public int updatePassword(Integer studentId, String password, String newPassword) {
        String realPassword = userDao.selectUserByStudentId(studentId);
        if (bCryptPasswordEncoder.matches(password,newPassword)) {
            User user = new User();
            user.setStudentId(studentId);
            user.setPassword(bCryptPasswordEncoder.encode(newPassword));
            userDao.updateByStudentId(user);
            return 0;
        }
        return 1;
    }

    @Override
    public int submitForgetPassword(Integer studentId, String newPassword) {
        int i = userDao.submitRequiredPassword(studentId, newPassword);
        return i;
    }

    @Override
    public UserInfo getUserInfo(Integer userId) {
        UserInfo userInfo = userDao.getUserInfo(userId);
        return userInfo;
    }
}
