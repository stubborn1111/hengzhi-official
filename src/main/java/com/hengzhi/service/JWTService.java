package com.hengzhi.service;


import com.hengzhi.entity.User;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * @author Jane
 * @version 1.0
 * @description
 * @Date 2021/5/19
 */
public interface JWTService {
    /**
     * 保存user登录信息，返回token
     * @param user
     * @return
     */
    String generateJWTToken(User user);

    /**
     * 将toke解密后的jwtId和redis里的jwtId比较进行验证
     * @param token
     * @return
     */
    boolean verifyJWTToken(String token) throws UnsupportedEncodingException;

    /**
     * 获取用户id
     * @param request
     * @return
     */
    Integer getUserId(HttpServletRequest request);

    /**
     * 获取用户角色
     * @param request
     * @return
     */
    public String getUserRole(HttpServletRequest request);

    public Integer getStudentId(HttpServletRequest request);
}
