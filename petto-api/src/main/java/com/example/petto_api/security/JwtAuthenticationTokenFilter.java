package com.example.petto_api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Value("${jwt.header}")
    private String tokenHeader;

    @Value("${jwt.tokenHead}")
    private String tokenHead;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain
    ) throws ServletException, IOException {

        String authHeader = request.getHeader(this.tokenHeader);
        if (!hasAuthorizationBearer(authHeader)) {
            chain.doFilter(request, response);
            return ;
        }

        String authToken = authHeader.substring(tokenHead.length()); // The part after head("Bearer")
        if (!jwtTokenService.validateToken(authToken)) {
            chain.doFilter(request, response);
            return ;
        }

        String username = jwtTokenService.getUsernameFromToken(authToken);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities()
        );
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(request, response);
    }

    private boolean hasAuthorizationBearer(String header) {
        return !ObjectUtils.isEmpty(header) && header.startsWith(this.tokenHead);
    }
}
