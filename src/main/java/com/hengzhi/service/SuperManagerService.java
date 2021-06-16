package com.hengzhi.service;

import com.hengzhi.dto.userBasic.UserInfo;
import com.hengzhi.entity.User;

import java.util.List;

/**
 * @author Jane
 * @version 1.0
 * @description 用户相关基本服务接口
 * @Date 2021/5/20
 */
public interface SuperManagerService {
    public String addAdmin(int userId);
    public String deleteAdmin(int userId);
    public List findList();
    public int findListNum();
    public String updatePassword(int userId);
    public String rejectUpdate(int userId);
    public String addUser(String name,int studentId);
    public String deleteUser(int userId);
    public List findAllUser();
}
