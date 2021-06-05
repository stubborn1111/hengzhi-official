package com.hengzhi.dto.paperAndTest;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * @author Jane
 * @version 1.0
 * @description
 * @Date 2021/5/29
 */
@Data
@NoArgsConstructor
@Accessors(chain = true)
@AllArgsConstructor
public class QuestionAnswer {
    private String answer;
    @JsonProperty("qNumber")
    private Integer qNumber;
}
