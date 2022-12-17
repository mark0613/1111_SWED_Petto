package com.example.petto_api.post;

import com.example.petto_api.user.UserModel;
import com.example.petto_api.user.UserService;
import org.junit.jupiter.api.BeforeEach;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.DataAccessException;
import org.springframework.security.access.method.P;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class PostServiceTest {

    @Autowired
    PostService postService;

    @Autowired
    UserService userService;

    @Autowired
    private PostRepository postRepository;


    @Test
    void testAddPost() {
        PostModel post = new PostModel();
        postService.addPost(post);
        assertNotNull(postService.getPostById(post.getId()));
    }

    @Test
    void testGetAllPosts() {
        ArrayList<PostModel> all = postService.getAllPosts();
        for(int i =0; i< all.size();i++){
            assertEquals(all.get(i).getTitle(), postService.getPostById(i+1).getTitle());
        }
    }
    @Test
    void testDeletePost() {
        assertEquals(postService.hasPostId(5),false);//偵測有無5號編號的post(資料庫無回傳false)

        assertEquals(postService.hasPostId(1),true);//偵測有無1號編號的post(有，回傳true)
        postService.deletePostById(1);
        assertEquals(postService.hasPostId(1),false);//檢查編號1的post是否還在(已被刪除回傳false)

        assertEquals(postService.hasPostId(3),true);///偵測有無3號編號的post(有，回傳true)
        postService.deletePostById(3);//刪除編號3的文章
        assertEquals(postService.hasPostId(3),false);//檢查編號3的post是否還在(已被刪除回傳false)

        assertEquals(postService.isOwner(2,2),true);//檢查2號編號的文章的userid是否跟請求刪除的相同
        assertEquals(postService.isOwner(1,2),false);//檢查2號編號的文章的userid是否跟請求刪除的相同
    }

    @Test
    void testKeepPost() {
        UserModel user = userService.getUserById(1);
        PostModel post = postService.getPostById(1);
        postService.keepPost(user, post);
    }
}
