package com.hengzhi.dto.ManagerPaper;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
@AllArgsConstructor
public class QuestionAnswer1 {
    @JsonProperty("qNumber")
    private  Integer qNumber;
    private Integer score;
}
