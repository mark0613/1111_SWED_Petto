package com.example.petto_api.post;


import com.example.petto_api.security.JwtTokenService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpMethod;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.test.web.servlet.MockMvcResultMatchersDsl;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@AutoConfigureMockMvc
@SpringBootTest
@ExtendWith(SpringExtension.class)
class PostControllerTest {
    @Resource
    private MockMvc mockMvc;

    @Autowired
    private JwtTokenService jwtTokenUtils;

    @MockBean
    private PostService postService;

    @MockBean
    private JwtTokenService jwtTokenService;

    @Test
    public void  deletePost() throws Exception {
        PostCreatedRequest postCreatedRequest = new PostCreatedRequest();
        postCreatedRequest.setJwt("1");
        PostCreatedRequest postCreatedRequest2 = new PostCreatedRequest();
        postCreatedRequest2.setJwt("3");
        Mockito.when(postService.hasPostId(1)).thenReturn(true);
        Mockito.when(postService.hasPostId(2)).thenReturn(true);
        Mockito.when(postService.hasPostId(5)).thenReturn(false);
        Mockito.when(postService.hasPostId(3)).thenReturn(true);
        Mockito.when(jwtTokenService.validateToken("1")).thenReturn(true);
        Mockito.when(jwtTokenService.validateToken("3")).thenReturn(true);
        Mockito.when(jwtTokenService.validateToken(null)).thenReturn(false);
        Mockito.when(jwtTokenService.validateToken("1")).thenReturn(true);
        Mockito.when(postService.isOwner(1,1)).thenReturn(true);
        Mockito.when(postService.isOwner(3,3)).thenReturn(true);
        Mockito.when(jwtTokenService.getUserIdFromToken("1")).thenReturn(1);
        Mockito.when(jwtTokenService.getUserIdFromToken("3")).thenReturn(3);

        //成功刪除
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/post/1").flashAttr("postCreatedRequest",postCreatedRequest)
        ).andExpect(MockMvcResultMatchers.jsonPath("$.message").value("刪除成功!"));
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/post/3").flashAttr("postCreatedRequest",postCreatedRequest2)
        ).andExpect(MockMvcResultMatchers.jsonPath("$.message").value("刪除成功!"));

        //模擬非擁有者請求刪除
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/post/2").flashAttr("postCreatedRequest",postCreatedRequest)
        ).andExpect(MockMvcResultMatchers.jsonPath("$.message").value("你不是擁有者!"));
        //模擬請求不存在的文章編號
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/post/5").flashAttr("postCreatedRequest",postCreatedRequest)
        ).andExpect(MockMvcResultMatchers.jsonPath("$.message").value("文章編號不存在!"));
        //模擬在無jwt的情況下請求
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/post/2")
        ).andExpect(MockMvcResultMatchers.jsonPath("$.message").value("權限不足!"));
    }

    @Test
    public void  getPost()throws Exception {
        MvcResult mvcResult = mockMvc.perform(
        MockMvcRequestBuilders.request(HttpMethod.GET,"/api/post/1")
        ).andReturn();
        log.info(mvcResult.getResponse().getContentAsString());
    }

    @Test
    public void getPosts()throws Exception {
        MvcResult mvcResult = mockMvc.perform(
                MockMvcRequestBuilders.request(HttpMethod.GET,"/api/posts")
        ).andReturn();
        log.info(mvcResult.getResponse().getContentAsString());
    }

    @Test
    public void modifyPost() throws Exception {
        MvcResult mvcResult = mockMvc.perform(
                MockMvcRequestBuilders.request(HttpMethod.PUT,"/api/post/1")
        ).andReturn();
        log.info(mvcResult.getResponse().getContentAsString());
    }
}