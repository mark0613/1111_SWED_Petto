package com.example.petto_api.Emoji;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EmojiServiceTest {
    EmojiModel emoji;

    @Autowired
    EmojiService emojiService;

    @BeforeEach
    void setUp() {
        emoji = new EmojiModel();
        emoji.setType("emoji" + System.currentTimeMillis());
    }

    @Test
    void avoidDuplicateType() throws DuplicateEmojiException {
        emojiService.addEmoji(emoji);
        assertThrowsExactly(DuplicateEmojiException.class, () -> { emojiService.addEmoji(emoji); });
    }
}