package com.hengzhi;

import com.hengzhi.service.GeneralManagerService;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
public class HengzhiOffcialApplication {

    public static void main(String[] args) {

        SpringApplication.run(HengzhiOffcialApplication.class, args);

    }

}
