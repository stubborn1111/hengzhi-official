package com.hengzhi.dto.ManagerPaper;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class UnTestPaper {
    private Integer paperId;
    private String paperName;
    private String beginTime;
    private String deadLine;
    private String description;

}
