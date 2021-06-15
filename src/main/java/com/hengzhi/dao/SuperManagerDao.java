package com.hengzhi.dao;

import com.hengzhi.dto.userBasic.UserInfo;
import com.hengzhi.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Jane
 * @version 1.0
 * @description (User)表数据库访问层
 * @Date 2021/4/30
 */
@Mapper
@Repository
public interface SuperManagerDao {
    void addAdmin(int userId);
    void deleteAdmin(int userId);
    List<User> findList();
    int findListNum();
    void updatePassword(int userId,String password);
}
