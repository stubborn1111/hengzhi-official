package com.hengzhi.secutity;

import com.hengzhi.shiro.JWT.JWTUtils;
import org.springframework.http.HttpStatus;
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
        response.setHeader("Access-control-Allow-Origin","*");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
        response.setHeader("Access-Control-Expose-Headers", "Authorization");
        response.setHeader("Access-Control-Allow-Headers","Authorization,Content-Type,Access-Control-Expose-Headers");
        if ("options".equals(request.getMethod())) {
            response.setStatus(HttpStatus.OK.value());
            return true;
        }
        if (handler instanceof HandlerMethod) {
            HandlerMethod hm = (HandlerMethod) handler;
            Security security = hm.getMethodAnnotation(Security.class);
            if (null == security) {
                //判断是否登录
                String token = request.getHeader("Authorization");
                if(token==null)return false;
                else{
                    return JWTUtils.verify(token);
                }
            }
            boolean needLogin = security.value();
            if (needLogin) {//默认需要登陆
                //判断是否登录
                String token = request.getHeader("Authorization");
                if(token==null)return false;
                else{
                    return JWTUtils.verify(token);
                }
            }
        }
        return true;
    }
}
