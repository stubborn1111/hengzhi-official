package com.hengzhi.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * @author Jane
 * @version 1.0
 * @description 留言实体类
 * @Date 2021/5/17
 */
@NoArgsConstructor
@Data
@Accessors(chain = true)
@AllArgsConstructor
public class Message {
    private Integer messageId;
    //留言内容
    private String content;
    //留言时间
    private String time;
    //是否审核（0/1)
    private Integer whetherReview;
}
