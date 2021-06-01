package com.hengzhi.shiro;

import com.hengzhi.service.JWTService;
import com.hengzhi.shiro.JWT.JWTToken;
import com.hengzhi.shiro.JWT.JWTUtils;
import lombok.SneakyThrows;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

/**
 * @author Jane
 * @version 1.0
 * @description
 * @Date 2021/4/30
 */
public class JWTRealm extends AuthorizingRealm {

    @Autowired
    JWTService jwtService;

    /**
     * 认证
     *
     * @param authenticationToken
     * @return
     * @throws AuthenticationException
     */
    @SneakyThrows
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        String token = authenticationToken.getCredentials().toString();
        //解析出信息
        Integer userId = JWTUtils.getUserId(token);
        String role = JWTUtils.getRole(token);
        if (userId == null) {
            throw new UnknownAccountException("userId不存在,请先登录！");
        }
        if (StringUtils.isEmpty(role)) {
            throw new UnknownAccountException("role不存在,请先登录！");
        }
        if (!jwtService.verifyJWTToken(token)) {
            throw new UnknownAccountException("token不存在,请先登录！");
        }
        //在这里将principal换为用户的id
        //由于帐号的校验放到控制层的login方法中,这里不再检验，token一样
        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(token, token, this.getName());
        return info;
    }


    /**
     * 授权
     *
     * @param principalCollection
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        String token = principalCollection.getPrimaryPrincipal().toString();
        String role = JWTUtils.getRole(token);
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        simpleAuthorizationInfo.addRole(role);
//        simpleAuthorizationInfo.addStringPermissions(rolePerms);
        return simpleAuthorizationInfo;
    }

    /**
     * 认证token
     * @param token
     * @return
     */
    @Override
    public boolean supports(AuthenticationToken token) {
        return token instanceof JWTToken;
    }

    @Override
    public CredentialsMatcher getCredentialsMatcher() {
        return (token, info) -> true;
    }

    /**
     * 重写方法，清除当前用户的 认证缓存
     * @param principals
     */
    @Override
    public void clearCachedAuthenticationInfo(PrincipalCollection principals) {
        super.clearCachedAuthenticationInfo(principals);
    }

    /**
     * 重写方法,清除当前用户的的 授权缓存
     *
     * @param principals
     */
    @Override
    public void clearCachedAuthorizationInfo(PrincipalCollection principals) {
        super.clearCachedAuthorizationInfo(principals);
    }

    @Override
    public void clearCache(PrincipalCollection principals) {
        super.clearCache(principals);
    }

    /**
     * 自定义方法：清除所有 授权缓存
     */
    public void clearAllCachedAuthorizationInfo() {
        getAuthorizationCache().clear();
    }

    /**
     * 自定义方法：清除所有 认证缓存
     */
    public void clearAllCachedAuthenticationInfo() {
        getAuthenticationCache().clear();
    }

    /**
     * 自定义方法：清除所有的  认证缓存  和 授权缓存
     */
    public void clearAllCache() {
        clearAllCachedAuthenticationInfo();
        clearAllCachedAuthorizationInfo();
    }

}
