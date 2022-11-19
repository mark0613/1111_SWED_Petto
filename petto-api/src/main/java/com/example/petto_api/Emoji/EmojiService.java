package com.example.petto_api.emoji;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class EmojiService {
    @Autowired
    private EmojiRepository emojiRepository;

    public EmojiModel findById(int id) {
        return emojiRepository.findById(id);
    }

    public ArrayList<EmojiModel> findAllEmojis() {
        return emojiRepository.findAll();
    }

    public void addEmoji(EmojiModel emojiModel) throws DuplicateEmojiException {
        boolean emojiExist = emojiRepository.findByType(emojiModel.getType()) != null;
        if (emojiExist) {
            throw new DuplicateEmojiException();
        }
        emojiRepository.save(emojiModel);
    }

    public long count() {
        return emojiRepository.count();
    }
}
