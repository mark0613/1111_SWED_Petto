package com.example.petto_api.seeder;

import com.example.petto_api.emoji.EmojiSeeder;
import com.example.petto_api.post.PostSeeder;
import com.example.petto_api.tag.TagSeeder;
import com.example.petto_api.user.UserSeeder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class DataSeeder implements CommandLineRunner {
    @Autowired
    private EmojiSeeder emojiSeeder;

    @Autowired
    private PostSeeder postSeeder;

    @Autowired
    private TagSeeder tagSeeder;

    @Autowired
    private UserSeeder userSeeder;

    @Override
    public void run(String... args) throws Exception {
        userSeeder.seed();
        emojiSeeder.seed();
        tagSeeder.seed();
        postSeeder.seed();
    }
}
