package com.hengzhi.dto.paperAndTest;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class MybatisData {
    String type;
    List<String> list;
}
