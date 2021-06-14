package com.hengzhi.dto.ManagerPaper;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class UserScoreInformation {
    private Integer userId;
    private String name;
}
