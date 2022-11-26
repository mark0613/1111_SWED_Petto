package com.example.petto_api.post;


import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import javax.annotation.Resource;

@Slf4j
@AutoConfigureMockMvc
@SpringBootTest
@ExtendWith(SpringExtension.class)
class PostControllerTest {
    @Resource
    private MockMvc mockMvc;

    @Test
    public void  deletePost() throws Exception {
        MvcResult mvcResult = mockMvc.perform(
                MockMvcRequestBuilders.request(HttpMethod.DELETE,"/api/post/1")
        ).andReturn();
        log.info(mvcResult.getResponse().getContentAsString());
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