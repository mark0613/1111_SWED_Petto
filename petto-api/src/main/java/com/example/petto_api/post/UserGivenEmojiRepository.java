package com.example.petto_api.post;

import com.example.petto_api.user.UserModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserGivenEmojiRepository extends CrudRepository<UserGivenEmojiModel, Integer> {
    UserGivenEmojiModel findById(int id);
    UserGivenEmojiModel findByUserAndPost(UserModel user, PostModel post);

    @Query(
        "SELECT new com.example.petto_api.post.PostContainEmojis(e.id, e.type, count(*)) " +
        "FROM UserGivenEmojiModel r, EmojiModel e " +
        "WHERE r.emoji = e " +
        "AND r.post = :post " +
        "GROUP BY r.post, r.emoji "
    )
    List<PostContainEmojis> countEmojiWithPost(@Param("post") PostModel post);
}
