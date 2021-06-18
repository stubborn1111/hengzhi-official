package com.hengzhi.shiro;


import com.hengzhi.shiro.JWT.JWTFilter;
import org.apache.shiro.cache.ehcache.EhCacheManager;
import org.apache.shiro.mgt.DefaultSessionStorageEvaluator;
import org.apache.shiro.mgt.DefaultSubjectDAO;
import org.apache.shiro.session.mgt.DefaultSessionManager;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.filter.authc.AuthenticationFilter;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.mgt.DefaultWebSubjectFactory;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.Filter;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;

/**
 * @author Jane
 * @version 1.0
 * @description 用来整合shiro框架相关的配置类
 * @Date 2021/5/22
 */
@Configuration
public class ShiroConfig {
    @Bean("shiroFilter")
    public ShiroFilterFactoryBean getShiroFilterFactoryBean() {
        //创建shiro的filter
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        //注入安全管理器
        shiroFilterFactoryBean.setSecurityManager(getSecurityManager());
        Map<String, Filter> filters = new HashMap<String, Filter>();
        filters.put("jwt", new JWTFilter());
        shiroFilterFactoryBean.setFilters(filters);
        LinkedHashMap<String, String> map = new LinkedHashMap<>();
        map.put("/user/login", "anon");
        map.put("/show/showMessages","anon");
        map.put("/show/addMessages","anon");
        map.put("/show/showNotice","anon");
        map.put("/show/showIntroduction","anon");
        map.put("/user/forgetPassword","anon");
        map.put("/user/getUserInfo", "anon");
        map.put("/headImage/**", "anon");
        map.put("/user/verify","anon");
        map.put("/page/**","anon");
        map.put("/layui/**","anon");
        map.put("/images/**","anon");
        map.put("/font-awesome-4.7.0/**","anon");
        map.put("/**", "jwt");
        shiroFilterFactoryBean.setFilterChainDefinitionMap(map);
        shiroFilterFactoryBean.setLoginUrl("/page/login/login.html");
        shiroFilterFactoryBean.setUnauthorizedUrl("/page/login/login.html");
        return shiroFilterFactoryBean;
    }

    @Bean("securityManager")
    public DefaultWebSecurityManager getSecurityManager() {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        // 关闭 ShiroDAO 功能
        DefaultSubjectDAO subjectDAO = new DefaultSubjectDAO();
        DefaultSessionStorageEvaluator defaultSessionStorageEvaluator = new DefaultSessionStorageEvaluator();
        // 不需要将 Shiro Session 中的东西存到任何地方（包括 Http Session 中）
        defaultSessionStorageEvaluator.setSessionStorageEnabled(false);
        subjectDAO.setSessionStorageEvaluator(defaultSessionStorageEvaluator);
        securityManager.setSubjectDAO(subjectDAO);
        //禁止Subject的getSession方法
        securityManager.setSubjectFactory(subjectFactory());
        //securityManager.setSessionManager(sessionManager());
        securityManager.setRealm(getRealm());
        securityManager.setCacheManager(ehCacheManager());
        return securityManager;
    }


    //创建自定义realm
    @Bean("jwtRealm")
    public JWTRealm getRealm() {
        JWTRealm jwtRealm = new JWTRealm();
        jwtRealm.setCachingEnabled(true);
        //启用身份验证缓存，即缓存AuthenticationInfo信息，默认false
        jwtRealm.setAuthenticationCachingEnabled(true);
        //缓存AuthenticationInfo信息的缓存名称 在ehcache.xml中有对应缓存的配置
        jwtRealm.setAuthenticationCacheName("authenticationCache");
        //jwtRealm.setCacheManager(ehCacheManager());
        //启用授权缓存，即缓存AuthorizationInfo信息，默认false
        jwtRealm.setAuthorizationCachingEnabled(true);
        //缓存AuthorizationInfo信息的缓存名称 在ehcache.xml中有对应缓存的配置
        jwtRealm.setAuthorizationCacheName("authorizationCache");
        return jwtRealm;
    }

    @Bean
    public FilterRegistrationBean<Filter> filterRegistrationBean() throws Exception {
        FilterRegistrationBean<Filter> filterRegistration = new FilterRegistrationBean<>();
        filterRegistration.setFilter((Filter) Objects.requireNonNull(getShiroFilterFactoryBean().getObject()));
        filterRegistration.addInitParameter("targetFilterLifecycle", "true");
        filterRegistration.setEnabled(true);
        return filterRegistration;
    }

    //创建缓存管理器
    @Bean
    public EhCacheManager ehCacheManager() {
        EhCacheManager em = new EhCacheManager();
        em.setCacheManagerConfigFile("classpath:resources/ehcache-shiro.xml");
        return em;
    }

    /**
     * session管理器：
     * sessionManager通过sessionValidationSchedulerEnabled禁用掉会话调度器，
     * 因为我们禁用掉了会话，所以没必要再定期过期会话了。
     *
     * @return
     */
    @Bean
    public DefaultSessionManager sessionManager() {
        DefaultSessionManager sessionManager = new DefaultSessionManager();
        //关闭session校验轮询
        sessionManager.setSessionValidationSchedulerEnabled(false);
        return sessionManager;
    }

    /**
     * 开启Shiro的注解(如@RequiresRoles,@RequiresPermissions),需借助SpringAOP扫描使用Shiro注解的类,并在必要时进行安全逻辑验证
     * 配置以下两个bean(DefaultAdvisorAutoProxyCreator和AuthorizationAttributeSourceAdvisor)即可实现此功能
     *
     * @return
     */
    @Bean
    public DefaultAdvisorAutoProxyCreator advisorAutoProxyCreator() {
        DefaultAdvisorAutoProxyCreator advisorAutoProxyCreator = new DefaultAdvisorAutoProxyCreator();
        advisorAutoProxyCreator.setProxyTargetClass(true);
        return advisorAutoProxyCreator;
    }

    /**
     * 开启shiro 注解模式
     * 可以在controller中的方法前加上注解
     * 如 @RequiresPermissions("userInfo:add")
     *
     * @return
     */
    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor() {
        AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
        authorizationAttributeSourceAdvisor.setSecurityManager(getSecurityManager());
        return authorizationAttributeSourceAdvisor;
    }


    /**
     * subject工厂管理器.
     *
     * @return
     */
    @Bean
    public DefaultWebSubjectFactory subjectFactory() {
        StatelessDefaultSubjectFactory subjectFactory = new StatelessDefaultSubjectFactory();
        return subjectFactory;
    }

}


