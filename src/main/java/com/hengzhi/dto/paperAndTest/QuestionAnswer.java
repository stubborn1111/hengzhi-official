package com.hengzhi.dto.paperAndTest;

import com.sun.org.apache.xalan.internal.xsltc.util.IntegerArray;
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
    private Integer qNumber;
}
