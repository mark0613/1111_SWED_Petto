package com.example.petto_api.post;

import com.example.petto_api.user.UserModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserGivenEmojiRepository extends CrudRepository<UserGivenEmojiModel, Integer> {
    UserGivenEmojiModel findById(int id);
    UserGivenEmojiModel findByUserAndPost(UserModel user, PostModel post);
    long countEmojiByPost(PostModel post);
}
