package com.example.petto_api.emoji;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EmojiServiceTest {
    com.example.petto_api.emoji.EmojiModel emoji;

    @Autowired
    com.example.petto_api.emoji.EmojiService emojiService;

    @BeforeEach
    void setUp() {
        emoji = new com.example.petto_api.emoji.EmojiModel();
        emoji.setType("emoji" + System.currentTimeMillis());
    }

    @Test
    void avoidDuplicateType() throws com.example.petto_api.emoji.DuplicateEmojiException {
        emojiService.addEmoji(emoji);
        assertThrowsExactly(com.example.petto_api.emoji.DuplicateEmojiException.class, () -> { emojiService.addEmoji(emoji); });
    }
}