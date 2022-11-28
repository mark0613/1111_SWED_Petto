package com.example.petto_api.emoji;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;


@Repository
public interface EmojiRepository extends CrudRepository<EmojiModel, Integer> {
    EmojiModel findById(int id);
    ArrayList<EmojiModel> findAll();
    EmojiModel findByType(String type);
}
