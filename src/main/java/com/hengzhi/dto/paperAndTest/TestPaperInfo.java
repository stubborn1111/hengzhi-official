package com.hengzhi.dto.paperAndTest;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.sql.Timestamp;

/**
 * @author Jane
 * @version 1.0
 * @description 考试的试卷信息
 * @Date 2021/5/28
 */
@Data
@NoArgsConstructor
@Accessors(chain = true)
public class TestPaperInfo {
    private String paperName;
    private String description;
    private Timestamp beginTime;
    private Timestamp deadline;
    private String name;
    private Integer score;
}
