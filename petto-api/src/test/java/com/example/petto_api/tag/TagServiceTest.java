package com.example.petto_api.tag;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TagServiceTest {
    TagModel tag;

    @Autowired
    TagService tagService;

    @BeforeEach
    void setUp() {
        tag = new TagModel();
        tag.setText("tag" + System.currentTimeMillis());
    }

    @Test
    void avoidDuplicateTag() throws DuplicateTagException {
        tagService.addTag(tag);
        assertThrowsExactly(DuplicateTagException.class, () -> { tagService.addTag(tag); });
    }
}