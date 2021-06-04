package com.hengzhi.dto.userBasic;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * @author Jane
 * @version 1.0
 * @description 用户信息dto
 * @Date 2021/6/4
 */
@Data
@NoArgsConstructor
@Accessors(chain = true)
public class UserInfo {
    private String headImg;
    private String name;
    private Integer userId;
    private Integer studentId;
    private String power;
}
