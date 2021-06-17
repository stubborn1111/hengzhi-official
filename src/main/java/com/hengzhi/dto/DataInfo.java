package com.hengzhi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
@Data
@NoArgsConstructor
@Accessors(chain = true)
public class DataInfo {
        private Integer dataId;
        //上传的人
        private String userName;
        //上传时间
        private String time;
        //文件描述
        private String description;
        //路径
        private String url;

    }

