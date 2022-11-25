package com.example.petto_api.post;

import com.example.petto_api.emoji.EmojiModel;
import com.example.petto_api.user.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserGivenEmojiService {
    @Autowired
    private UserGivenEmojiRepository userGivenEmojiRepository;

    public UserGivenEmojiModel findById(int id) {
        return userGivenEmojiRepository.findById(id);
    }

    public UserGivenEmojiModel findByUserAndPost(UserModel user, PostModel post) {
        return userGivenEmojiRepository.findByUserAndPost(user, post);
    }

    public Integer add(UserGivenEmojiModel record) {
        return userGivenEmojiRepository.save(record).getId();
    }

    public Integer updateEmoji(UserGivenEmojiModel record, EmojiModel newEmoji) {
        record.setEmoji(newEmoji);
        return this.add(record);
    }

    public void deleteEmoji(UserGivenEmojiModel record) {
        userGivenEmojiRepository.delete(record);
    }

    public List<PostContainEmojis> countEmojiByPost(PostModel post) {
        if (post == null) {
            return null;
        }
        return userGivenEmojiRepository.countEmojiWithPost(post);
    }

    public void userGiveEmojiToPost(UserModel user, EmojiModel emoji, PostModel post) {
        UserGivenEmojiModel record = userGivenEmojiRepository.findByUserAndPost(user, post);
        boolean userHadGivenEmoji = record != null;
        if (userHadGivenEmoji) {
            boolean isSameEmoji = record.getEmoji().getId() == emoji.getId();
            if (isSameEmoji) {
                this.deleteEmoji(record);
            }
            else {
                this.updateEmoji(record, emoji);
            }
        }
        else {
            record = new UserGivenEmojiModel();
            record.setUser(user);
            record.setEmoji(emoji);
            record.setPost(post);
            this.add(record);
        }
    }
}
