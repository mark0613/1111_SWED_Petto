package com.example.petto_api.post;

import com.example.petto_api.user.UserModel;
import com.example.petto_api.user.UserService;
import org.junit.jupiter.api.BeforeEach;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PostServiceTest {
    PostModel post;

    @Autowired
    PostService postService;

    @Autowired
    UserService userService;

    @BeforeEach
    void setup() {
        long timestamp = System.currentTimeMillis();
        post = new PostModel();
        String content = "test" + timestamp + "@example.com";
        String type = "text";
        Date date = new Date() ;

        String title = "test" + timestamp +"title";
        post.setContent(content);
        post.setTitle(title);
        post.setTimestamp(date);
        post.setMode(type);
        post.setUpdated(true);
    }

    @Test
    void testAddPost() {
        postService.addPost(post);
        assertEquals(post.getContent(), postService.getPostById(post.getId()).getContent());
        assertEquals(post.getTitle(), postService.getPostById(post.getId()).getTitle());
    }

    @Test
    void testGetAllPosts() {
        ArrayList<PostModel> all = postService.getAllPosts();
        for(int i =0; i< all.size();i++){
            assertEquals(all.get(i).getTitle(), postService.getPostById(i+1).getTitle());
        }
    }

    @Test
    void testKeepPost() {
        UserModel user = userService.getUserById(1);
        PostModel post = postService.getPostById(1);
        postService.keepPost(user, post);
    }
}
