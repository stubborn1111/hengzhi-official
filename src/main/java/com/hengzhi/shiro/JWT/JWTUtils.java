package com.hengzhi.shiro.JWT;

/**
 * @author Jane
 * @version 1.0
 * @description
 * @Date 2021/5/19
 */

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.hengzhi.entity.User;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;

import java.io.UnsupportedEncodingException;
import java.util.Calendar;
import java.util.Date;

public class JWTUtils {
    private static final String SECRET = "@%DFD@!#@$%^DF";

    /**
     * 生成签名,expireTime后过期
     *
     * @param user 用户信息
     * @return 加密的token
     */
    public static String sign(User user) {
        try {
            Calendar c = Calendar.getInstance();
            c.add(Calendar.DATE, 7);//默认7天过期
            Algorithm algorithm = Algorithm.HMAC256(SECRET);
            // 附带username信息
            return JWT.create()
                    .withClaim("userId", user.getUserId())
                    .withClaim("name", user.getName())
                    .withClaim("headImg", user.getHeadImg())
                    .withClaim("role", user.getRole())
                    .withClaim("studentId", user.getStudentId())
                    .withExpiresAt(c.getTime())
                    .withIssuedAt(new Date())
                    .sign(algorithm);
        } catch (UnsupportedEncodingException e) {
            return null;
        }
    }

    /**
     * 验证token
     *
     * @param token
     * @return
     */
    public static boolean verify(String token) {
        //得到算法相同的JWTVerifier
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SECRET)).build();
            //验证token
            verifier.verify(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * token是否过期
     *
     * @return true：过期
     */
    public static boolean isTokenExpired(String token) {
        Date now = Calendar.getInstance().getTime();
        try {
            DecodedJWT jwt = JWT.decode(token);
            return jwt.getExpiresAt().before(now);
        } catch (JWTDecodeException e) {
            return true;
        }
    }

    /**
     * 获得token中的信息无需secret解密也能获得
     *
     * @return token中包含的签发时间
     */
    public static Date getIssuedAt(String token) {
        try {
            DecodedJWT jwt = JWT.decode(token);
            return jwt.getIssuedAt();
        } catch (JWTDecodeException e) {
            return null;
        }
    }

    /**
     * 获得token中的信息无需secret解密也能获得
     * @return token中包含的用户名id
     */
    public static Integer getUserId(String token) {
        try {
            DecodedJWT jwt = JWT.decode(token);
            return jwt.getClaim("userId").asInt();
        } catch (JWTDecodeException e) {
            return null;
        }
    }

    /**
     * 获得token中的学号
     *
     * @param token
     * @return
     */
    public static Integer getStudentId(String token) {
        try {
            DecodedJWT jwt = JWT.decode(token);
            return jwt.getClaim("studentId").asInt();
        } catch (JWTDecodeException e) {
            return null;
        }
    }

    public static String getRole(String token) {
        try {
            DecodedJWT jwt = JWT.decode(token);
            return jwt.getClaim("role").asString();
        } catch (JWTDecodeException e) {
            return null;
        }
    }

}

