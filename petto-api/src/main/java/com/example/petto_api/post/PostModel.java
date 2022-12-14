package com.example.petto_api.post;

import com.example.petto_api.tag.TagModel;
import com.example.petto_api.reply.ReplyModel;
import com.example.petto_api.user.UserModel;
import com.example.petto_api.vote.VoteModel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.*;

@Entity
@Table(name = "post")
@Getter @Setter
public class PostModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    @NotBlank(message = "文章標題不可為空!")
    @Size(max = 50, message = "文章標題不可超過50字")
    private String title;

    @Column(columnDefinition="TEXT")
    @NotBlank(message = "文章內容不可為空!")
    private String content;

    @Column
    private String mode = "text";

    @Column
    @NotNull
    private Date timestamp;

    @Column
    @NotNull
    private Boolean updated = false;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="owner")
    private UserModel userModel;

    @Transient
    private String username;

    @JsonManagedReference
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE, mappedBy = "postModel")
    @EqualsAndHashCode.Exclude
    private Set<ReplyModel> replies;

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = { CascadeType.REMOVE, CascadeType.MERGE }
    )
    @JoinTable(
            name = "post_tags",
            joinColumns = { @JoinColumn(name = "post_id") },
            inverseJoinColumns = { @JoinColumn(name = "tag_id") }
    )
    private Set<TagModel> tags = new HashSet<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.MERGE, mappedBy = "post")
    private Set<UserGivenEmojiModel> givenEmojis;

    @Transient
    private List<PostContainEmojis> emojis = new ArrayList<>();

    @JsonIgnore
    @ManyToMany(
            fetch = FetchType.EAGER,
            cascade = { CascadeType.REMOVE, CascadeType.MERGE },
            mappedBy = "keepingPosts"
    )
    private Set<UserModel> users;

    @JsonManagedReference
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "post")
    private Set<VoteModel> options = new HashSet<>();

    @Transient @ElementCollection
    private Map<String, Integer> voteResult = new HashMap<>();
}
