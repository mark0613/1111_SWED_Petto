package com.example.petto_api.post;

import com.example.petto_api.security.JwtTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping("/api")
public class PostController {
    @Autowired
    private JwtTokenService jwtTokenUtils;

    @Autowired
    private PostService postService;

    @GetMapping("/posts")
    public ResponseEntity<ArrayList<PostModel>> getPost() {
        ArrayList<PostModel> posts = postService.getPosts();
        HttpStatus httpStatus = HttpStatus.OK;
        return ResponseEntity.status(httpStatus).body(posts);
    }

    @PostMapping("/post")
    public ResponseEntity<Map<String, Object>> post(@Valid PostModel postModel, BindingResult bindingResult) {
        String message;
        HttpStatus httpStatus;
        if (bindingResult.hasErrors()) {
            message = Objects.requireNonNull(bindingResult.getFieldError()).getDefaultMessage();
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        else {
            postService.addPost(postModel);
            message = "文章發布成功!";
            httpStatus = HttpStatus.CREATED;
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", message);
        return ResponseEntity.status(httpStatus).body(response);
    }
}
