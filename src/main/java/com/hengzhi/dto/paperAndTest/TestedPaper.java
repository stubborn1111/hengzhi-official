package com.hengzhi.dto.paperAndTest;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.sql.Timestamp;
/**
 * @author Jane
 * @version 1.0
 * @description 已考试试卷dto
 * @Date 2021/5/24
 */
@Data
@NoArgsConstructor
@Accessors(chain = true)
public class TestedPaper {
    //试卷id
    private Integer paperId;
    //试卷名字
    private String paperName;
    //试卷开始时间
    private Timestamp beginTime;
    //试卷结束时间
    private Timestamp deadline;
    //出卷人名
    private String name;
    //完成的时间，单位为分钟
    private Integer finishTime;
    //试卷得分
    private Integer score;
}
