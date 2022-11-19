package com.example.petto_api.Emoji;


import com.example.petto_api.post.PostModel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
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

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = { CascadeType.REMOVE, CascadeType.ALL },
            mappedBy = "emojis"
    )
    @JsonIgnore
    private Set<PostModel> posts = new HashSet<>();
}
