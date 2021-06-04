package com.hengzhi.dto.paperAndTest;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * @author Jane
 * @version 1.0
 * @description
 * @Date 2021/6/3
 */
@Data
@NoArgsConstructor
@Accessors(chain = true)
public class GetPaper {
    private Integer paperId;
    private String paperName;
    private String beginTime;
    private String deadline;
    private String name;
}
