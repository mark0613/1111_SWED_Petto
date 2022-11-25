package com.example.petto_api.post;

import com.example.petto_api.emoji.EmojiModel;
import com.example.petto_api.post.PostModel;
import com.example.petto_api.user.UserModel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Table(name = "given_emojis")
@Getter @Setter
public class UserGivenEmojiModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private UserModel user;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "emoji_id")
    private EmojiModel emoji;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "post_id")
    private PostModel post;
}
