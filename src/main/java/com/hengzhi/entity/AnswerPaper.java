package com.hengzhi.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * @author Jane
 * @version 1.0
 * @description 用户答题实体类
 * @Date 2021/4/30
 */
@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class AnswerPaper {
    private Integer answerPaperId;
    //用户id
    private Integer userId;
    //试卷id
    private Integer paperId;
    //题号
    private Integer qNumber;
    //回答
    private String answer;
    //得分
    private Integer score;
}
