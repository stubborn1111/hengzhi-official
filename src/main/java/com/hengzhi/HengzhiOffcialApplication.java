package com.hengzhi;

import com.hengzhi.service.GeneralManagerService;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
public class HengzhiOffcialApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(HengzhiOffcialApplication.class, args);
    }

    // 继承SpringBootServletInitializer 实现configure 方便打war 外部服务器部署。
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(HengzhiOffcialApplication.class);
    }

}
