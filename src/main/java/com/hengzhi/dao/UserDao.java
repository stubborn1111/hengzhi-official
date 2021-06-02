package com.hengzhi.dao;

import com.hengzhi.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;
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
public interface UserDao {
    /**根据学号和密码查询
     * @param studentId
     * @param password
     * @return 查到的用户信息
     */
    User selectUserByStudentIdAndPassword(Integer studentId,String password);

    /**
     * 修改用户信息
     * @param user
     * @return 受影响的行数
     */
    int updateByStudentId(User user);

    String selectUserByStudentId(Integer studentId);

    /**
     * 提交忘记密码，审核
     * @param studentId
     * @param newPassword
     * @return
     */
    int submitRequiredPassword(Integer studentId,String newPassword);
}
