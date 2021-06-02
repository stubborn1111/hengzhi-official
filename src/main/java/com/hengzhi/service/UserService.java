package com.hengzhi.service;

import com.hengzhi.entity.User;

/**
 * @author Jane
 * @version 1.0
 * @description 用户相关基本服务接口
 * @Date 2021/5/20
 */
public interface UserService {
    User login(User user);

    int updateHeadImg(User user);

    int updatePassword(Integer studentId,String password,String newPassword);

    int submitForgetPassword(Integer studentId,Integer newPassword);
}
