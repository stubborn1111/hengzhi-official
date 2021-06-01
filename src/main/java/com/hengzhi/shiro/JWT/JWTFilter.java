package com.hengzhi.shiro.JWT;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.BasicHttpAuthenticationFilter;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * @author Jane
 * @version 1.0
 * @description 拦截请求，和shiro整合
 * @Date 2021/5/19
 */
public class JWTFilter extends BasicHttpAuthenticationFilter {
    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Override
    protected boolean preHandle(ServletRequest request, ServletResponse response) throws Exception {
        HttpServletRequest httpServletRequest = WebUtils.toHttp(request);
        HttpServletResponse httpServletResponse = WebUtils.toHttp(response);
        fillCorsHeader(httpServletRequest, httpServletResponse);
        //对于OPTION请求做拦截，不做token校验
        if (httpServletRequest.getMethod().equals(RequestMethod.OPTIONS.name())) {
            httpServletResponse.setStatus(HttpStatus.OK.value());
            return false;
        }
        return super.preHandle(request, response);
    }


    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
        try {
            boolean b = executeLogin(request, response);
            if (!b) return false;
        } catch (Exception e) {
            System.out.println("权限不足aaaaaaa");
            throw new AuthenticationException("权限不足", e);
        }
        return true;
    }

    @Override
    protected boolean isLoginAttempt(String authzHeader) {
        return super.isLoginAttempt(authzHeader);
    }

    /**
     * 到自定义realm中，进行认证和授权
     *
     * @param request
     * @param response
     * @return
     */
    @Override
    protected boolean executeLogin(ServletRequest request, ServletResponse response) {
        AuthenticationToken token = null;
        token = this.createToken(request, response);
        if (token == null)
            return false;
        Subject subject = this.getSubject(request, response);
        subject.login(token);
        return true;
    }


    @Override
    protected AuthenticationToken createToken(ServletRequest servletRequest, ServletResponse servletResponse) {
        String jwtToken = getAuthzHeader(servletRequest);
        System.out.println(jwtToken);
        if (StringUtils.isBlank(jwtToken)) {
            return null;
        } else if (JWTUtils.isTokenExpired(jwtToken))
            return null;
        else
            return new JWTToken(jwtToken);
    }

    /**
     * 设置响应头
     *
     * @param response
     * @return
     */
    private HttpServletResponse setHeaders(ServletResponse response) {
        HttpServletResponse httpServletResponse = WebUtils.toHttp(response);
        httpServletResponse.setStatus(HttpStatus.FORBIDDEN.value());
        httpServletResponse.setCharacterEncoding("UTF-8");
        httpServletResponse.setContentType("application/json; charset=utf-8");
        return httpServletResponse;
    }


    public static void fillCorsHeader(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        httpServletResponse.setHeader("Access-control-Allow-Origin", httpServletRequest.getHeader("Origin"));
        httpServletResponse.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
        httpServletResponse.setHeader("Access-Control-Expose-Headers", "Authorization");
    }
}
