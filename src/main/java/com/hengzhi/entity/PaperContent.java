package com.hengzhi.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * @author Jane
 * @version 1.0
 * @description 试卷试题实体类
 * @Date 2021/5/17
 */
@NoArgsConstructor
@Data
@Accessors(chain = true)
@AllArgsConstructor
public class PaperContent {
    private Integer paperContentId;
    //试卷id
    private Integer paperId;
    //题目类型，0填空，1单选，2多选，3主观
    private Integer qType;
    //题目id
    private Integer questionId;
    //题号
    private Integer qNumber;
}
