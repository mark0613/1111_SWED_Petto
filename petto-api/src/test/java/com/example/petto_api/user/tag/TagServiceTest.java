package com.example.petto_api.user.tag;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TagServiceTest {
    com.example.petto_api.tag.TagModel tag;

    @Autowired
    com.example.petto_api.tag.TagService tagService;

    @BeforeEach
    void setUp() {
        tag = new com.example.petto_api.tag.TagModel();
        tag.setText("tag" + System.currentTimeMillis());
    }

    @Test
    void avoidDuplicateTag() throws com.example.petto_api.tag.DuplicateTagException {
        tagService.addTag(tag);
        assertThrowsExactly(com.example.petto_api.tag.DuplicateTagException.class, () -> { tagService.addTag(tag); });
    }
}