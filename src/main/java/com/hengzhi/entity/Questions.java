package com.hengzhi.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * @author Jane
 * @version 1.0
 * @description 题目实体类
 * @Date 2021/5/17
 */
@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class Questions {
    //问题id
    private Integer questionId;
    //出题人id
    private Integer userId;
    //标签内容
    private String kind;
    //题目内容
    private String content;
    //答案内容
    private String answer;
    //正确率
    private String cRate;
    //题目讲解
    private String description;
    //题目类型，0填空，1单选，2多选，3主观
    private String qType;
}
