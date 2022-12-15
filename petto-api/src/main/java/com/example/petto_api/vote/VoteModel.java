package com.example.petto_api.vote;

import com.example.petto_api.post.PostModel;
import com.example.petto_api.user.UserModel;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table(name = "vote")
@Getter @Setter
public class VoteModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String text;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="post")
    private PostModel post;

    @JsonIgnore
    @ManyToMany(
            fetch = FetchType.EAGER,
            cascade = { CascadeType.REMOVE, CascadeType.MERGE },
            mappedBy = "votingOption"
    )
    private Set<UserModel> users;
}
