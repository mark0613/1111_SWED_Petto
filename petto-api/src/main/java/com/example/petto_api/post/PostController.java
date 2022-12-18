package com.example.petto_api.post;

import com.example.petto_api.emoji.EmojiModel;
import com.example.petto_api.emoji.EmojiService;
import com.example.petto_api.tag.TagModel;
import com.example.petto_api.tag.TagService;
import com.example.petto_api.security.JwtTokenService;
import com.example.petto_api.user.UserModel;
import com.example.petto_api.user.UserService;
import com.example.petto_api.vote.VoteModel;
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
        response.put("posts", posts);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/posts/{user_id}")
    public ResponseEntity<Map<String, Object>> getUserPosts(@PathVariable("user_id") int user_id) {
        Map<String, Object> response = new HashMap<>();
        UserModel user = userService.getUserById(user_id);
        ArrayList<PostModel> posts = postService.getAllPosts(user);
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
        Set<VoteModel> vote = new HashSet<>();

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
        if (mode.equals("vote")) {
            if (postCreatedRequest.getOptions().size() != 4) {
                message = "要建立投票，必須且只能設定4個選項";
                response.put("message", message);
                httpStatus = HttpStatus.BAD_REQUEST;
                return ResponseEntity.status(httpStatus).body(response);
            }
            for (String text : postCreatedRequest.getOptions()) {
                VoteModel option = new VoteModel();
                option.setPost(postModel);
                option.setText(text);
                vote.add(option);
            }
        }

        postModel.setTitle(title);
        postModel.setContent(content);
        postModel.setUserModel(userService.getUserById(userId));
        postModel.setMode(mode);
        postModel.setTimestamp(new Date());
        postModel.setTags(tags);
        postModel.setOptions(vote);
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

        if(!postService.hasPostId(post_id)){
            message = "文章編號不存在!";
            response.put("message", message);
            httpStatus = HttpStatus.UNAUTHORIZED;
            return ResponseEntity.status(httpStatus).body(response);
        }

        PostModel post = postService.getPostById(post_id);
        response.put("posts", post);
        httpStatus = HttpStatus.OK;
        return ResponseEntity.status(httpStatus).body(response);
    }

    @DeleteMapping("/post/{post_id}")
    public ResponseEntity<Map<String, Object>> deletePost(@PathVariable("post_id") int post_id, PostCreatedRequest postCreatedRequest){
        String message;
        HttpStatus httpStatus;
        Map<String, Object> response = new HashMap<>();

        String jwt = postCreatedRequest.getJwt();

        if(!postService.hasPostId(post_id)){
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
        if (!(postService.isOwner(userId,post_id))) {
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

        String jwt = postCreatedRequest.getJwt();
        String title = postCreatedRequest.getTitle();
        String content = postCreatedRequest.getContent();
        String mode = postCreatedRequest.getMode();
        Set<TagModel> tags = new HashSet<>();

        if(!postService.hasPostId(post_id)){
            message = "文章編號不存在!";
            response.put("message", message);
            httpStatus = HttpStatus.UNAUTHORIZED;
            return ResponseEntity.status(httpStatus).body(response);
        }

        PostModel postModel = postService.getPostById(post_id);
        if (!jwtTokenService.validateToken(jwt)) {
            message = "權限不足!";
            response.put("message", message);
            httpStatus = HttpStatus.UNAUTHORIZED;
            return ResponseEntity.status(httpStatus).body(response);
        }

        int userId = jwtTokenService.getUserIdFromToken(jwt);
        if (!(postService.isOwner(userId,post_id))) {
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

    @GetMapping("/emoji-record")
    public ResponseEntity<Map<String, Object>> getEmojiRecordOnPost(@RequestParam int post, @RequestParam int user) {
        PostModel p = postService.getPostById(post);
        UserModel u = userService.getUserById(user);
        UserGivenEmojiModel record = userGivenEmojiService.getRecordByUserAndPost(u, p);
        Map<String, Object> response = new HashMap<>();
        if (record == null) {
            response.put("emoji", null);
        }
        else {
            response.put("emoji", record.getEmoji());
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/keep")
    public ResponseEntity<Map<String, Object>> getAllKeepingPost(PostKeepRequest request) {
        HttpStatus httpStatus;
        Map<String, Object> response = new HashMap<>();
        List<PostModel> posts = new ArrayList<>();
        String jwt = request.getJwt();
        if (jwtTokenService.validateToken(jwt)) {
            int userId = jwtTokenService.getUserIdFromToken(jwt);
            UserModel user = userService.getUserById(userId);
            posts = postService.getKeepingPost(user);
        }
        response.put("posts", posts);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/keep/{postId}")
    public ResponseEntity<Map<String, Object>> keepPost(@PathVariable("postId") int postId, PostKeepRequest request) {
        String message;
        HttpStatus httpStatus;
        Map<String, Object> response = new HashMap<>();
        String jwt = request.getJwt();
        if (!jwtTokenService.validateToken(jwt)) {
            message = "權限不足!";
            response.put("message", message);
            httpStatus = HttpStatus.UNAUTHORIZED;
            return ResponseEntity.status(httpStatus).body(response);
        }
        int userId = jwtTokenService.getUserIdFromToken(jwt);
        boolean postExist = postService.getPostById(postId) != null;
        if (postExist) {
            UserModel user = userService.getUserById(userId);
            PostModel post = postService.getPostById(postId);
            postService.keepPost(user, post);
            message = "收藏成功";
            httpStatus = HttpStatus.OK;
        }
        else {
            message = "文章不存在!";
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        response.put("message", message);
        return ResponseEntity.status(httpStatus).body(response);
    }
}
