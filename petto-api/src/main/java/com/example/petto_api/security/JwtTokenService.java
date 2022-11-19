package com.example.petto_api.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtTokenService implements Serializable {
    private static String SECRET;
    private static long EXPIRATION_TIME;

    @Value("${jwt.expiration}")
    public void setExpirationTime(long expirationTime) {
        JwtTokenService.EXPIRATION_TIME = expirationTime;
    }

    @Value("${jwt.secret}")
    public void setSecret(String secret) {
        JwtTokenService.SECRET = secret;
    }

    public String generateToken(Map<String, Object> userDetails) {
        Map<String, Object> claims = new HashMap<>(userDetails);

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(Instant.now().toEpochMilli() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    public boolean validateToken(String token){
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        } catch (SignatureException | MalformedJwtException |
                ExpiredJwtException | UnsupportedJwtException |
                IllegalArgumentException e) {
            return false;
        }
    }

    public Map<String, Object> getClaimFromToken(String token) {
        return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
    }

    public String getUsernameFromToken(String token) {
        Map<String, Object> claims = this.getClaimFromToken(token);
        return (String) claims.get("username");
    }

    public int getUserIdFromToken(String token) {
        Map<String, Object> claims = this.getClaimFromToken(token);
        return (int) claims.get("id");
    }
}
