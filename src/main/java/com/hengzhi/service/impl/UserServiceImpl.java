package com.hengzhi.service.impl;

import com.hengzhi.dao.UserDao;
import com.hengzhi.entity.User;
import com.hengzhi.service.UserService;
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
@Service
public class UserServiceImpl implements UserService {
    @Resource
    UserDao userDao;

    /**
     * 登陆
     * @param user
     * @return
     */
    @Override
    public User login(User user) {
        User userDB = userDao.selectUserByStudentIdAndPassword(user.getStudentId(), user.getPassword());
        return userDB;
    }

    @Override
    public int updateHeadImg(User user) {
        return userDao.updateByStudentId(user);
    }

    @Override
    public int updatePassword(Integer studentId, String password, String newPassword) {
        String realPassword = userDao.selectUserByStudentId(studentId);
        //newPassword = DigestUtils.md5DigestAsHex(newPassword.getBytes());
        if (realPassword.equals(password)) {
            User user = new User();
            user.setStudentId(studentId);
            user.setPassword(newPassword);
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
}
