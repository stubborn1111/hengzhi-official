package com.hengzhi.shiro.JWT;


import lombok.Getter;
import lombok.Setter;
import org.apache.shiro.authc.AuthenticationToken;

@Getter
@Setter
public class JWTToken implements AuthenticationToken {
    // 密钥
    private String token;

    public JWTToken(String token) {
        this.token = token;
    }

    @Override
    public Object getPrincipal() {
        return token;
    }

    @Override
    public Object getCredentials() {
        return token;
    }
}
