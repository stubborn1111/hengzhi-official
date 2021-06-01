package com.hengzhi.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * @author Jane
 * @version 1.0
 * @description 上传文件信息实体类
 * @Date 2021/5/17
 */
@lombok.Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class Data {
    private Integer dataId;
    //上传的人
    private Integer userId;
    //上传时间
    private String time;
    //文件描述
    private String description;
    //路径
    private String url;

}
