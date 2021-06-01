package com.hengzhi.dto.paperAndTest;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * @author Jane
 * @version 1.0
 * @description 用户答题dto
 * @Date 2021/5/25
 */
@Data
@NoArgsConstructor
@Accessors(chain = true)
public class AnswerSituation {
    private String answer;
    private Integer score;
}
