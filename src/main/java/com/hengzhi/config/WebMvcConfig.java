package com.hengzhi.config;

import com.hengzhi.secutity.BCryptPasswordEncoder;
import com.hengzhi.secutity.JWTInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.system.ApplicationHome;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

/**
 * @author Jane
 * @version 1.0
 * @description
 * @Date 2021/4/30
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Autowired
    JWTInterceptor interceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        InterceptorRegistration registration = registry.addInterceptor(interceptor);
        registration.addPathPatterns("/**");
    }


}
