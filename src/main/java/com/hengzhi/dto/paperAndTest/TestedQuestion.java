package com.hengzhi.dto.paperAndTest;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class TestedQuestion {
    //标签内容
    private String kind;
    //题目内容
    private String content;
    //答案内容
    private String answer;
    //总人数
    private Integer totalNumber;
    //正确人数
    private Integer correctNumber;
    //题目讲解
    private String description;
    //题目类型
    @JsonProperty("qType")
    private String qType;

    public TestedQuestion2 transfer(){
        double cRate = ((int)((getCorrectNumber()/1.0/getTotalNumber())*100))/100;
        TestedQuestion2 question2 = new TestedQuestion2(getKind(),getContent(),getAnswer(),cRate,getDescription(),getQType(),1);
        return question2;
    }
}