package com.hengzhi.dto.ManagerPaper;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;


@Data
@NoArgsConstructor
@Accessors(chain = true)
public class UnCorrectStudentList {
    //用户id
    private Integer userId;
    //试卷id
    private Integer paperId;
    //题号
    private Integer qNumber;
    //回答
    private String answer;
    private List<UnCorrectStudentList1> unCorrectStudentList1List;
}
