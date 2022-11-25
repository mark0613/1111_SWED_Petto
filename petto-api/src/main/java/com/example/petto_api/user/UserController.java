package com.example.petto_api.user;

import com.example.petto_api.security.JwtTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping("/api")
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenService jwtTokenUtils;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid UserModel userModel, BindingResult bindingResult) {
        String message;
        HttpStatus httpStatus;
        if (bindingResult.hasErrors()) {
            message = Objects.requireNonNull(bindingResult.getFieldError()).getDefaultMessage();
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        else {
            userModel.setType("member");
            userService.addUser(userModel);
            message = "註冊成功!";
            httpStatus = HttpStatus.CREATED;
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", message);
        return ResponseEntity.status(httpStatus).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(UserLoginRequest request) {
        String message;
        HttpStatus httpStatus;
        String account = request.getAccount();
        String password = request.getPassword();
        Map<String, Object> response = new HashMap<>();
        UserModel foundUser = userService.getUserByEmailOrUsername(account);
        try {
            Authentication authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(foundUser.getUsername(), password)
            );
            Map<String, Object> userDetails = new HashMap<>();
            userDetails.put("id", foundUser.getId());
            userDetails.put("username", foundUser.getUsername());
            String token = jwtTokenUtils.generateToken(userDetails);
            response.put("jwt", token);
            message = "登入成功!";
            httpStatus = HttpStatus.OK;
        }
        catch (Exception e) {
            message = "帳號或密碼錯誤!";
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        response.put("message", message);
        return ResponseEntity.status(httpStatus).body(response);
    }
}
