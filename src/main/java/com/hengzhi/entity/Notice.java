package com.hengzhi.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * @author Jane
 * @version 1.0
 * @description 通知公告实体类
 * @Date 2021/5/16
 */
@NoArgsConstructor
@Data
@Accessors(chain = true)
@AllArgsConstructor
public class Notice {
    private Integer noticeId;
    //发布人
    private Integer userId;
    //公告内容
    private String content;
    //发布时间
    private String time;
}
