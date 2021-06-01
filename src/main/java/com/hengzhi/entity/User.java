package com.hengzhi.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * @author Jane
 * @version 1.0
 * @description 用户类
 * @Date 2021/5/17
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
@Accessors(chain = true)
public class User {
    //用户id
    private Integer userId;
    //学号
    private Integer studentId;
    //姓名
    private String name;
    //密码
    private String password;
    //角色
    private String role;
    //头像url
    private String headImg;
    //是否需要审核，需要审核则通过审核才可以登陆
    private String required;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getHeadImg() {
        return headImg;
    }

    public void setHeadImg(String headImg) {
        this.headImg = headImg;
    }

    public String getRequired() {
        return required;
    }

    public void setRequired(String required) {
        this.required = required;
    }
}
