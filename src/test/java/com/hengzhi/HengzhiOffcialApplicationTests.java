package com.hengzhi;

import com.hengzhi.dao.GeneralManagerDao;
import com.hengzhi.dao.UserDao;
import com.hengzhi.entity.User;
import com.hengzhi.service.UserService;
import com.hengzhi.service.impl.UserServiceImpl;
import lombok.extern.slf4j.Slf4j;

import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.util.DigestUtils;

import javax.annotation.Resource;
@Slf4j
@SpringBootTest
@WebAppConfiguration
class HengzhiOffcialApplicationTests {
    @Resource
    UserDao userDao;
    @Resource
    GeneralManagerDao generalManagerDao;
//    @Test
//    void contextLoads() {
//        log.error("测试---------------------");
//    }
    //测试login5
    @Test
    void test() {
        System.out.println(generalManagerDao.selectUnExam());
    }
//
//    //测试修改密码
//    @Test
//    void testUpdatePassword() {
//        User user = new User();
//        user.setStudentId(2019013012);
//        //user.setHeadImg("2333");
//        user.setPassword("2222");
//        userDao.updateByStudentId(user);
//    }
//
//    //测试md5
//    @Test
//    void md5Test(){
//        String md5Password = DigestUtils.md5DigestAsHex("1234".getBytes());
//        System.out.println(md5Password);
//    }
//    //提交忘记密码
//    @Test
//    void test1(){
//        int i = userDao.submitRequiredPassword(34255, "1234");
//        System.out.println(i);
//    }

}
