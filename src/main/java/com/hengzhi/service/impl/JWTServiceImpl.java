package com.hengzhi.service.impl;

import com.hengzhi.entity.User;
import com.hengzhi.service.JWTService;
import com.hengzhi.shiro.JWT.JWTUtils;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

/**
 * @author Jane
 * @version 1.0
 * @description
 * @Date 2021/5/19
 */
@Service
public class JWTServiceImpl implements JWTService {

    @Override
    public String generateJWTToken(User user) {
        String token = JWTUtils.sign(user);
        return token;
    }


    /**
     * @param token
     * @return 验证token
     * @throws UnsupportedEncodingException
     */
    @Override
    public boolean verifyJWTToken(String token) throws UnsupportedEncodingException {
        boolean verify = JWTUtils.verify(token);
        return verify;
    }

    /**
     * 得到userId
     * @param request
     * @return
     */
    @Override
    public Integer getUserId(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        return JWTUtils.getUserId(token);
    }

    /**
     * 得到用户角色
     * @param request
     * @return
     */
    @Override
    public String getUserRole(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        return JWTUtils.getRole(token);
    }


    @Override
    public Integer getStudentId(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        return JWTUtils.getStudentId(token);
    }
}
