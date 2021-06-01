package com.hengzhi.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * @author Jane
 * @version 1.0
 * @description 工作室信息实体类
 * @Date 2021/4/30
 */
@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class Introduction {
    //工作室简介
    private String teamIntroduction;
    //前端简介
    private String front;
    //后端简介
    private String behind;
    //图1路径
    private String img1;
    //图2路径
    private String img2;
}
