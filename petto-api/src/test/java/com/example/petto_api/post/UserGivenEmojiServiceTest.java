package com.example.petto_api.post;

import com.example.petto_api.emoji.EmojiModel;
import com.example.petto_api.emoji.EmojiService;
import com.example.petto_api.user.UserModel;
import com.example.petto_api.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserGivenEmojiServiceTest {
    @Autowired
    EmojiService emojiService;

    @Autowired
    PostService postService;

    @Autowired
    UserService userService;

    @Autowired
    UserGivenEmojiService userGivenEmojiService;

    UserModel user;
    EmojiModel emoji;
    PostModel post;
    UserGivenEmojiModel record;

    @BeforeEach
    void setUp() {
        user = userService.getUserById(1);
        emoji = emojiService.getEmojiById(1);
        post = postService.getPostById(1);
        record = new UserGivenEmojiModel();
        record.setUser(user);
        record.setEmoji(emoji);
        record.setPost(post);
    }

    @Test
    void testAdd() {
        int id = userGivenEmojiService.add(record);
        assertEquals(id, record.getId());
    }

    @Test
    void testUpdateEmoji() {
        EmojiModel emoji;
        userGivenEmojiService.add(record);
        record = userGivenEmojiService.getRecordById(1);
        emoji = emojiService.getEmojiById(2);
        userGivenEmojiService.updateEmoji(record, emoji);
        record = userGivenEmojiService.getRecordById(1);
        assertEquals(emoji.getId(), record.getEmoji().getId());
    }

    @Test
    void testUserGiveEmojiToPost() {
        // first
        userGivenEmojiService.userGiveEmojiToPost(user, emoji, post);
        record = userGivenEmojiService.getRecordByUserAndPost(user, post);
        assertEquals(record.getEmoji().getId(), emoji.getId());

        // duplicate [user, post] but different [emoji]
        long totalEmoji = emojiService.count();
        EmojiModel newEmoji = emojiService.getEmojiById(3);
        record = userGivenEmojiService.getRecordByUserAndPost(user, post);
        userGivenEmojiService.userGiveEmojiToPost(user, newEmoji, post);
        record = userGivenEmojiService.getRecordByUserAndPost(user, post);
        assertEquals(newEmoji.getId(), record.getEmoji().getId());

        // duplicate [user, post, emoji]
        record = userGivenEmojiService.getRecordByUserAndPost(user, post);
        userGivenEmojiService.userGiveEmojiToPost(user, newEmoji, post);
        record = userGivenEmojiService.getRecordByUserAndPost(user, post);
        assertNull(record);
    }
}
