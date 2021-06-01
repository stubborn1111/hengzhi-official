package com.hengzhi.utils;

/**
 * @author Jane
 * @version 1.0
 * @description
 * @Date 2021/4/30
 */
public class SelectTableUtils {
    public static String selectT(String qType){
        if("0".equals(qType))return "questions_fill";
        else if("1".equals(qType))return "questions_single";
        else if("2".equals(qType)) return "questions_multiple";
        else return "questions_subjective";
    }
}
