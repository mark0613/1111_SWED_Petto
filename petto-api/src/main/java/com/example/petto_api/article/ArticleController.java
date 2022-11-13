package com.example.petto_api.article;

import com.example.petto_api.security.JwtTokenService;
import com.example.petto_api.user.UserLoginRequest;
import com.example.petto_api.user.UserModel;
import com.example.petto_api.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping("/api")
public class ArticleController {

    @Autowired
    private JwtTokenService jwtTokenUtils;

    @Autowired
    private ArticleService articleService;

    @PostMapping("/post")
    public ResponseEntity<Map<String, Object>> postArticle(@Valid ArticleModel articleModel, BindingResult bindingResult) {
        String message;
        HttpStatus httpStatus;
        if (bindingResult.hasErrors()) {
            message = Objects.requireNonNull(bindingResult.getFieldError()).getDefaultMessage();
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        else {
            articleService.addArticle(articleModel);
            message = "文章發布成功!";
            httpStatus = HttpStatus.CREATED;
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", message);
        return ResponseEntity.status(httpStatus).body(response);
    }

    @GetMapping("/posts")
    public ArrayList<ArticleModel> getArticle (){
        ArrayList<ArticleModel> articles = articleService.getAllArticle();
        return articles;
    }


}
