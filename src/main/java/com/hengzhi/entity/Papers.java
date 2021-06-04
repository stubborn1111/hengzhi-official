package com.hengzhi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.sql.Timestamp;
import java.util.Date;

/**
 * @author Jane
 * @version 1.0
 * @description 试卷实体类
 * @Date 2021/5/16
 */
@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class Papers {
    //试卷id
    private Integer paperId;
    //试卷开始时间
    private String beginTime;
    //截止时间
    private String endTime;
    //完成时间（单位为分钟）
    private String finishTime;
    //试卷名
    private String name;
    //出卷人id
    private Integer userId;
    //答案解析
    private String description;
    //邀请码
    private String code;
    //答题人数
    private Integer number;
    //试卷总分
    private Integer score;
}
