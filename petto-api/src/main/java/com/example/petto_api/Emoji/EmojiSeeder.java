package com.example.petto_api.emoji;

import com.example.petto_api.seeder.Seeder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class EmojiSeeder implements Seeder {
    @Autowired
    private EmojiService emojiService;

    @Override
    public void seed() {
        String[] emojiTypes = {"good", "love", "funny" ,"sad", "angry"};
        if (emojiService.count() == 0) {
            EmojiModel emoji;
            for (String type : emojiTypes) {
                emoji = new EmojiModel();
                emoji.setType(type);
                try {
                    emojiService.addEmoji(emoji);
                }
                catch (DuplicateEmojiException ignored) {
                    ;
                }
            }
        }
    }
}
