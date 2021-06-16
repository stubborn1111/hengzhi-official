package com.hengzhi.dto.paperAndTest;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class Tag {
    int tagId;
    String tagName;
}
