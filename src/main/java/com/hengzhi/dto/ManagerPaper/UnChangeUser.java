package com.hengzhi.dto.ManagerPaper;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class UnChangeUser {

    //试卷id
    private Integer paperId;
    //是否批改
    private Integer whetherCorrect;
}
