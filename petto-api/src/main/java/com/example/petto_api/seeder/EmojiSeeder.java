package com.example.petto_api.seeder;

import com.example.petto_api.emoji.DuplicateEmojiException;
import com.example.petto_api.emoji.EmojiModel;
import com.example.petto_api.emoji.EmojiService;
import com.example.petto_api.seeder.Seeder;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;


@Component
public class EmojiSeeder implements Seeder {
    @Autowired
    private EmojiService emojiService;

    @Override
    public void seed() {
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<Emoji>> typeReference = new TypeReference<List<Emoji>>(){};
        InputStream inputStream = TypeReference.class.getResourceAsStream("/json/emojis.json");
        List<Emoji> emojiTypes = new ArrayList<>();
        try {
            emojiTypes = mapper.readValue(inputStream, typeReference);
        }
        catch (Exception ignored) {
            ;
        }

        if (emojiService.count() == 0) {
            EmojiModel emoji;
            for (Emoji e : emojiTypes) {
                emoji = new EmojiModel();
                emoji.setType(e.getType());
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
