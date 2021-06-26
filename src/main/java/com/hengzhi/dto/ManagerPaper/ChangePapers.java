package com.hengzhi.dto.ManagerPaper;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class ChangePapers {
    //试卷id
    private Integer paperId;
    //试卷开始时间
    private String beginTime;
    //我们规定的完成时间
    private String deadLine;
    //试卷名
    private String paperName;
    //考这套试卷的总人数
    private Integer totalNumber;

    private List<UnChangeUser> unChangeUserList;
}
