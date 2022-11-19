package com.example.petto_api.Tag;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class TagService {
    @Autowired
    private TagRepository tagRepository;

    public TagModel findById(int id) {
        return tagRepository.findById(id);
    }

    public ArrayList<TagModel> findAllTags() {
        return tagRepository.findAll();
    }

    public void addTag(TagModel tag) throws DuplicateTagException {
        boolean tagExist = tagRepository.findByText(tag.getText()) != null;
        if (tagExist) {
            throw new DuplicateTagException();
        }
        tagRepository.save(tag);
    }
}
