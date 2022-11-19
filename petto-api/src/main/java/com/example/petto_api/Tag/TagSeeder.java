package com.example.petto_api.tag;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class TagSeeder implements CommandLineRunner {
    @Autowired
    private TagService tagService;

    @SneakyThrows
    @Override
    public void run(String... args) throws Exception {
        seedTagData();
    }

    public void seedTagData() throws DuplicateTagException {
        String []tagTexts = {"犬", "貓", "鳥", "烏龜" ,"守宮"};
        if (tagService.count() == 0) {
            TagModel tag;
            for (String text : tagTexts) {
                tag = new TagModel();
                tag.setText(text);
                tagService.addTag(tag);
            }
        }
    }
}
