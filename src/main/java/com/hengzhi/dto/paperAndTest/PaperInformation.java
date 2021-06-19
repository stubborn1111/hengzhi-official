package com.hengzhi.dto.paperAndTest;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * @author Jane
 * @version 1.0
 * @description
 * @Date 2021/4/30
 */
@Data
@NoArgsConstructor
@Accessors(chain = true)
public class PaperInformation {
    private String name;
    private String answerTime;
    private Integer score;
    private Integer totalScore;
}
