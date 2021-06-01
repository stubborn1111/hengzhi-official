package com.hengzhi.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;


/**
 * @author Jane
 * @version 1.0
 * @description 用户答卷id
 * @Date 2021/5/16
 */
@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class UserPaper {
    //答卷id
    private Integer userPaperId;
    //试卷id
    private Integer paperId;
    //用户id
    private Integer userId;
    //是否已答过（0/1）
    private Integer whetherAnswer;
    //是否已结束（0/1）
    private Integer whetherEnd;
    //是否已批改（0/1）
    private Integer  whetherCorrect;
    //分数
    private Integer score;
    //回答的时间（单位为分钟）
    private Integer answerTime;
}
