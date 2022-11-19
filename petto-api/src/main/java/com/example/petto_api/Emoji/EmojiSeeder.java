package com.example.petto_api.emoji;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class EmojiSeeder implements CommandLineRunner {
    @Autowired
    private EmojiService emojiService;

    @SneakyThrows
    @Override
    public void run(String... args) throws Exception {
        seedEmojiData();
    }

    public void seedEmojiData() throws DuplicateEmojiException {
        String[] emojiTypes = {"good", "love", "funny" ,"sad", "angry"};
        if (emojiService.count() == 0) {
            EmojiModel emoji;
            for (String type : emojiTypes) {
                emoji = new EmojiModel();
                emoji.setType(type);
                emojiService.addEmoji(emoji);
            }
        }
    }
}
