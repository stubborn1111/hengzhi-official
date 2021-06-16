package com.hengzhi.dto.paperAndTest;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@NoArgsConstructor
public class ShowQuestions {
    //问题id
    private Integer questionId;
    //出题人id
    private String userName;
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
    //题目类型，0填空，1单选，2多选，3主观
    private String qType;
    private double cRate;
}
