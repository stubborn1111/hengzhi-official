package com.hengzhi.dto.paperAndTest;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

/**
 * @author Jane
 * @version 1.0
 * @description 未考试试卷DTO
 * @Date 2021/5/24
 */
@Data
@NoArgsConstructor
@Accessors(chain = true)
public class UntestedPaper {
    //试卷id
    private Integer paperId;
    //试卷名字
    private String paperName;
    //试卷开始时间
    private String beginTime;
    //试卷结束时间
    private String deadline;
    //出卷人名
    private String name;
}
