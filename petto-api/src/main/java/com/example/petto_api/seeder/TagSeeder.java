package com.example.petto_api.seeder;

import com.example.petto_api.tag.DuplicateTagException;
import com.example.petto_api.tag.TagModel;
import com.example.petto_api.tag.TagService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;


@Component
public class TagSeeder implements Seeder {
    @Autowired
    private TagService tagService;

    @Override
    public void seed() {
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<Tag>> typeReference = new TypeReference<List<Tag>>(){};
        InputStream inputStream = TypeReference.class.getResourceAsStream("/json/tags.json");
        List<Tag> tags = new ArrayList<>();
        try {
            tags = mapper.readValue(inputStream, typeReference);
        }
        catch (Exception ignored) {
            ;
        }

        if (tagService.count() == 0) {
            TagModel tag;
            for (Tag t : tags) {
                tag = new TagModel();
                tag.setText(t.getText());
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
