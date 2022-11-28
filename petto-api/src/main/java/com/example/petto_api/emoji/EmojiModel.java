package com.example.petto_api.emoji;


import com.example.petto_api.post.UserGivenEmojiModel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table(name = "emoji")
@Getter  @Setter
public class EmojiModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String type;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.MERGE, mappedBy = "emoji")
    private Set<UserGivenEmojiModel> givenEmojis;
}
