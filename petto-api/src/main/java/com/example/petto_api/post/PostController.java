package com.example.petto_api.post;

import com.example.petto_api.emoji.EmojiModel;
import com.example.petto_api.emoji.EmojiService;
import com.example.petto_api.tag.TagModel;
import com.example.petto_api.tag.TagService;
import com.example.petto_api.security.JwtTokenService;
import com.example.petto_api.user.UserModel;
import com.example.petto_api.user.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@Controller
@RequestMapping("/api")
public class PostController {

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private EmojiService emojiService;

    @Autowired
    private PostService postService;

    @Autowired
    private TagService tagService;

    @Autowired
    private UserGivenEmojiService userGivenEmojiService;

    @Autowired
    private UserService userService;

    @GetMapping("/posts")
    public ResponseEntity<Map<String, Object>> getPosts() {
        Map<String, Object> response = new HashMap<>();
        ArrayList<PostModel> posts = postService.getAllPosts();
        for (PostModel post : posts) {
            post.setEmojis(userGivenEmojiService.countEmojiByPost(post));
        }
        response.put("posts", posts);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/post")
    public ResponseEntity<Map<String, Object>> createPost(PostCreatedRequest postCreatedRequest) {
        String message;
        HttpStatus httpStatus;
        Map<String, Object> response = new HashMap<>();

        String jwt = postCreatedRequest.getJwt();
        String title = postCreatedRequest.getTitle();
        String content = postCreatedRequest.getContent();
        String mode = postCreatedRequest.getMode();
        Set<TagModel> tags = new HashSet<>();

        if (!jwtTokenService.validateToken(jwt)) {
            message = "權限不足!";
            response.put("message", message);
            httpStatus = HttpStatus.UNAUTHORIZED;
            return ResponseEntity.status(httpStatus).body(response);
        }
        if (StringUtils.isAnyBlank(title, content)) {
            message = "標題和內容都不能為空!";
            response.put("message", message);
            httpStatus = HttpStatus.BAD_REQUEST;
            return ResponseEntity.status(httpStatus).body(response);
        }
        if (StringUtils.isBlank(mode)) {
            mode = "text";
        }

        int userId = jwtTokenService.getUserIdFromToken(jwt);
        for (Integer tag_id : postCreatedRequest.getTags()) {
            TagModel tag = tagService.getTagById(tag_id);
            if (tag == null) {
                continue;
            }
            tags.add(tag);
        }

        PostModel postModel = new PostModel();
        postModel.setTitle(title);
        postModel.setContent(content);
        postModel.setUserModel(userService.getUserById(userId));
        postModel.setMode(mode);
        postModel.setTimestamp(new Date());
        postModel.setTags(tags);
        int post_id = postService.addPost(postModel);
        message = "建立成功!";
        response.put("message", message);
        response.put("post_id", post_id);
        httpStatus = HttpStatus.CREATED;
        return ResponseEntity.status(httpStatus).body(response);
    }

    @GetMapping("/post/{post_id}")
    public ResponseEntity<Map<String, Object>> getPost(@PathVariable("post_id") int post_id){
        String message;
        HttpStatus httpStatus;
        Map<String, Object> response = new HashMap<>();

        if(!postService.hasPostID(post_id)){
            message = "文章編號不存在!";
            response.put("message", message);
            httpStatus = HttpStatus.UNAUTHORIZED;
            return ResponseEntity.status(httpStatus).body(response);
        }

        PostModel post = postService.getPostById(post_id);
        post.setEmojis(userGivenEmojiService.countEmojiByPost(post));
        response.put("post", post);
        httpStatus = HttpStatus.OK;
        return ResponseEntity.status(httpStatus).body(response);
    }

    @DeleteMapping("/post/{post_id}")
    public ResponseEntity<Map<String, Object>> deletePost(@PathVariable("post_id") int post_id, PostCreatedRequest postCreatedRequest){
        String message;
        HttpStatus httpStatus;
        Map<String, Object> response = new HashMap<>();
        PostModel postModel = postService.getPostById(post_id);

        String jwt = postCreatedRequest.getJwt();

        if(!postService.hasPostID(post_id)){
            message = "文章編號不存在!";
            response.put("message", message);
            httpStatus = HttpStatus.UNAUTHORIZED;
            return ResponseEntity.status(httpStatus).body(response);
        }
        if (!jwtTokenService.validateToken(jwt)) {
            message = "權限不足!";
            response.put("message", message);
            httpStatus = HttpStatus.UNAUTHORIZED;
            return ResponseEntity.status(httpStatus).body(response);
        }

        int userId = jwtTokenService.getUserIdFromToken(jwt);
        if (!(userService.getUserById(userId) ==  postModel.getUserModel())) {
            message = "你不是擁有者!";
            response.put("message", message);
            httpStatus = HttpStatus.UNAUTHORIZED;
            return ResponseEntity.status(httpStatus).body(response);
        }

        postService.deletePostById(post_id);
        message = "刪除成功!";
        response.put("message", message);
        httpStatus = HttpStatus.OK;
        return ResponseEntity.status(httpStatus).body(response);
    }

    @PutMapping ("/post/{post_id}")
    public ResponseEntity<Map<String, Object>> modifyPost(@PathVariable("post_id") int post_id,PostCreatedRequest postCreatedRequest) {
        String message;
        HttpStatus httpStatus;
        Map<String, Object> response = new HashMap<>();
        PostModel postModel = postService.getPostById(post_id);

        String jwt = postCreatedRequest.getJwt();
        String title = postCreatedRequest.getTitle();
        String content = postCreatedRequest.getContent();
        String mode = postCreatedRequest.getMode();
        Set<TagModel> tags = new HashSet<>();

        if(!postService.hasPostID(post_id)){
            message = "文章編號不存在!";
            response.put("message", message);
            httpStatus = HttpStatus.UNAUTHORIZED;
            return ResponseEntity.status(httpStatus).body(response);
        }
        if (!jwtTokenService.validateToken(jwt)) {
            message = "權限不足!";
            response.put("message", message);
            httpStatus = HttpStatus.UNAUTHORIZED;
            return ResponseEntity.status(httpStatus).body(response);
        }

        int userId = jwtTokenService.getUserIdFromToken(jwt);
        if (!(userService.getUserById(userId) ==  postModel.getUserModel())) {
            message = "你不是擁有者!";
            response.put("message", message);
            httpStatus = HttpStatus.UNAUTHORIZED;
            return ResponseEntity.status(httpStatus).body(response);
        }
        if (StringUtils.isAnyBlank(title, content)) {
            message = "標題和內容都不能為空!";
            response.put("message", message);
            httpStatus = HttpStatus.BAD_REQUEST;
            return ResponseEntity.status(httpStatus).body(response);
        }
        if (StringUtils.isBlank(mode)) {
            mode = "text";
        }
        for (Integer tag_id : postCreatedRequest.getTags()) {
            TagModel tag = tagService.getTagById(tag_id);
            if (tag == null) {
                continue;
            }
            tags.add(tag);
        }

        postModel.setTitle(title);
        postModel.setContent(content);
        postModel.setUserModel(userService.getUserById(userId));
        postModel.setMode(mode);
        postModel.setTimestamp(new Date());
        postModel.setTags(tags);
        postService.addPost(postModel);
        message = "修改成功!";
        response.put("message", message);
        response.put("post_id", post_id);
        httpStatus = HttpStatus.CREATED;
        return ResponseEntity.status(httpStatus).body(response);
    }

    @PostMapping("/emoji")
    public ResponseEntity<Map<String, Object>> giveEmoji(EmojiGivenRequest request) {
        String message;
        HttpStatus httpStatus;
        Map<String, Object> response = new HashMap<>();

        String jwt = request.getJwt();
        int postId = request.getPostId();
        int emojiId = request.getEmojiId();

        if (!jwtTokenService.validateToken(jwt)) {
            message = "權限不足!";
            response.put("message", message);
            httpStatus = HttpStatus.UNAUTHORIZED;
            return ResponseEntity.status(httpStatus).body(response);
        }

        PostModel post = postService.getPostById(postId);
        EmojiModel emoji = emojiService.getEmojiById(emojiId);
        if (post == null || emoji == null) {
            if (post == null) {
                message = "文章編號不存在";
            }
            else {
                message = "表情編號不存在";
            }
            response.put("message", message);
            httpStatus = HttpStatus.BAD_REQUEST;
            return ResponseEntity.status(httpStatus).body(response);
        }

        int userId = jwtTokenService.getUserIdFromToken(jwt);
        UserModel user = userService.getUserById(userId);
        UserGivenEmojiModel record = userGivenEmojiService.getRecordByUserAndPost(user, post);
        userGivenEmojiService.userGiveEmojiToPost(user, emoji, post);

        message = "給予成功";
        response.put("message", message);
        httpStatus = HttpStatus.CREATED;
        return ResponseEntity.status(httpStatus).body(response);
    }
}
