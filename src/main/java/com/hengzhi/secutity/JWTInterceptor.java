package com.hengzhi.secutity;

import com.hengzhi.shiro.JWT.JWTUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author Jane
 * @version 1.0
 * @description
 * @Date 2021/5/19
 */
@Component
public class JWTInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod) {
            HandlerMethod hm = (HandlerMethod) handler;
            Security security = hm.getMethodAnnotation(Security.class);
            if (null == security) {
                //判断是否登录
                String token = request.getHeader("Authorization");
                if(token==null)return false;
                else{
                    System.out.println("========"+token);
                    return JWTUtils.verify(token);
                }
            }
            boolean needLogin = security.value();
            if (needLogin) {//默认需要登陆
                //判断是否登录
                String token = request.getHeader("Authorization");
                if(token==null)return false;
                else{
                    System.out.println("========"+token);
                    return JWTUtils.verify(token);
                }
            }
        }
        return true;
    }
}
