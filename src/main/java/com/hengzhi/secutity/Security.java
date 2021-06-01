package com.hengzhi.secutity;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author Jane
 * @version 1.0
 * @description
 * @Date 2021/4/30
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Security {
    //是否需要登陆,true需要
    boolean value() default true;
}
