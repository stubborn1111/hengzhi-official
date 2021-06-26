package com.hengzhi.dto.ManagerPaper;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class UnFinishPapers {

    //试卷id
    private  Integer paperId;
    //开始时间
    private String beginTime;
    //截止时间
    private String deadLine;
    //试卷名
    private  String paperName;
    //邀请码
    private String code;
    //试卷描述
    private String description;
}
