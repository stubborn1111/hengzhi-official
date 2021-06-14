package com.hengzhi.dto.ManagerPaper;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class ScoreInformation {
    private Integer userId;
    private Integer score;
    private Integer paperId;
    private Integer whetherCorrect;
    private List<UserScoreInformation> userScoreInformationList;
}
