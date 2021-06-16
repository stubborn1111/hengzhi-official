package com.hengzhi.dto.ManagerPaper;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class UnCorrectStudentList1 {
    private Integer paperId;
    private Integer userId;
    private Integer whetherAnswer;
    private Integer whetherEnd;
    private Integer whetherCorrect;
}
