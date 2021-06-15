package com.hengzhi.dto.ManagerPaper;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class SubjectContent {
    private Integer qType;
    private Integer questionId;
    private Integer qNumber;
    private Integer paperId;
    private List<CorrectSubject> correctSubjectList;
}
