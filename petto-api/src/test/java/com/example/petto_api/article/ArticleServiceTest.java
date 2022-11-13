package com.example.petto_api.article;

import org.junit.jupiter.api.BeforeEach;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.ArrayList;

import javax.validation.ConstraintViolationException;

import java.lang.reflect.Array;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ArticleServiceTest {
    ArticleModel article;

    @Autowired
    ArticleService articleService;

    @BeforeEach
    void setup() {
        long timestamp = System.currentTimeMillis();
        article = new ArticleModel();
        String content = "test" + timestamp + "@example.com";
        String username = "test" + timestamp;
        String title = "test" +timestamp +"title";
        article.setContent(content);
        article.setUsername(username);
        article.setTitle(title);
    }

    @Test
    void testAddArticle() {
        articleService.addArticle(article);
        assertEquals(article.getContent(),articleService.getArticleById(article.getId()).getContent());
        assertEquals(article.getTitle(),articleService.getArticleById(article.getId()).getTitle());
    }
    @Test
    void testGetAllArticle() {
        ArrayList<ArticleModel> all = articleService.getAllArticle();
        for(int i =0; i< all.size();i++){
            assertEquals(all.get(i).getTitle(),articleService.getArticleById(i+1).getTitle());
            assertEquals(all.get(i).getUsername(),articleService.getArticleById(i+1).getUsername());
        }

    }


}
