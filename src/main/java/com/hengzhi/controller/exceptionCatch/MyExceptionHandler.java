package com.hengzhi.controller.exceptionCatch;

import org.apache.shiro.crypto.hash.Hash;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

//import javax.jws.WebResult;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Jane
 * @version 1.0
 * @description 异常统一处理
 * @Date 2021/5/29
 */
@ControllerAdvice
public class MyExceptionHandler {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public Map<String, String> ErrorHandler(Exception e) {
        Map<String, String> map = new HashMap<>();
        map.put("status", "error");
        if (e instanceof org.apache.shiro.authz.UnauthorizedException) {
            map.put("exception", e.toString());
            map.put("msg", "没有通过权限验证！暂无该权限");
            logger.info(map.toString());
            return map;
        }
        if (e instanceof org.apache.shiro.authz.UnauthenticatedException) {
            map.put("exception", e.toString());
            map.put("msg", "没有通过权限验证！请先登录");
        } else {
            map.put("exception", e.toString());
            map.put("msg", "其他错误");
            return map;
        }
        logger.info(map.toString());
        return map;
    }
}
