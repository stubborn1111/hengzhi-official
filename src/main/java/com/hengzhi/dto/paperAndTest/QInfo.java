package com.hengzhi.dto.paperAndTest;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * @author Jane
 * @version 1.0
 * @description 试卷试题信息dto
 * @Date 2021/5/28
 */
@Data
@Accessors(chain = true)
@NoArgsConstructor
public class QInfo {
    private Integer questionId;//题目id
    @JsonProperty("qType")
    private String qType;//题目类型
}
