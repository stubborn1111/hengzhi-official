package com.hengzhi.dto.paperAndTest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * @author Jane
 * @version 1.0
 * @description 考试的试题信息dto
 * @Date 2021/5/28
 */
@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class TestQuestion {
    private Integer questionId;//题目id
    private String qType;//题目类型
    private String content;//题目内容
}
