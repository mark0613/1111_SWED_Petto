package com.example.petto_api.Tag;


import com.example.petto_api.post.PostModel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "tag")
@Getter  @Setter
public class TagModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String text;

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = { CascadeType.REMOVE, CascadeType.ALL },
            mappedBy = "tags"
    )
    @JsonIgnore
    private Set<PostModel> posts = new HashSet<>();
}
