package com.example.petto_api.post;

import com.example.petto_api.security.JwtTokenService;
import com.example.petto_api.user.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.*;

import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api")
public class PostController {
    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @GetMapping("/posts")
    public ResponseEntity<Map<String, Object>> getPost() {
        Map<String, Object> response = new HashMap<>();
        ArrayList<PostModel> posts = postService.getPosts();
        response.put("posts", posts);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/post")
    public ResponseEntity<Map<String, Object>> post(PostCreatedRequest postCreatedRequest) {
        String message;
        HttpStatus httpStatus;
        Map<String, Object> response = new HashMap<>();

        String jwt = postCreatedRequest.getJwt();
        String title = postCreatedRequest.getTitle();
        String content = postCreatedRequest.getContent();
        String mode = postCreatedRequest.getMode();
        String [] tags = postCreatedRequest.getTags();

        if (!jwtTokenService.validateToken(jwt)) {
            message = "權限不足!";
            response.put("message", message);
            httpStatus = HttpStatus.UNAUTHORIZED;
            return ResponseEntity.status(httpStatus).body(response);
        }

        int userId = jwtTokenService.getUserIdFromToken(jwt);

        if (StringUtils.isAnyBlank(title, content)) {
            message = "標題和內容都不能為空!";
            response.put("message", message);
            httpStatus = HttpStatus.BAD_REQUEST;
            return ResponseEntity.status(httpStatus).body(response);
        }
        if (StringUtils.isBlank(mode)) {
            mode = "text";
        }

        PostModel postModel = new PostModel();
        postModel.setTitle(title);
        postModel.setContent(content);
        postModel.setUserModel(userService.findUserById(userId));
        postModel.setMode(mode);
        postModel.setTimestamp(new Date());
        int post_id = postService.addPost(postModel);
        message = "建立成功!";
        response.put("message", message);
        response.put("post_id", post_id);
        httpStatus = HttpStatus.CREATED;
        return ResponseEntity.status(httpStatus).body(response);
    }
}
