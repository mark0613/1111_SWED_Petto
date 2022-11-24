package com.example.petto_api.tag;

import com.example.petto_api.seeder.Seeder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class TagSeeder implements Seeder {
    @Autowired
    private TagService tagService;

    @Override
    public void seed() {
        String []tagTexts = {"犬", "貓", "鳥", "烏龜" ,"守宮", "吉娃娃"};
        if (tagService.count() == 0) {
            TagModel tag;
            for (String text : tagTexts) {
                tag = new TagModel();
                tag.setText(text);
                try {
                    tagService.addTag(tag);
                }
                catch (DuplicateTagException ignored) {
                    ;
                }
            }
        }
    }
}
