package com.example.petto_api.post;

import com.example.petto_api.Tag.TagModel;
import com.example.petto_api.reply.ReplyModel;
import com.example.petto_api.user.UserModel;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

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

    @Column
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
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="owner")
    private UserModel userModel;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "postModel")
    @EqualsAndHashCode.Exclude
    private Set<ReplyModel> replyModels;

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = { CascadeType.REMOVE, CascadeType.ALL }
    )
    @JoinTable(
            name = "post_tags",
            joinColumns = { @JoinColumn(name = "post_id") },
            inverseJoinColumns = { @JoinColumn(name = "tag_id") }
    )
    private Set<TagModel> tags = new HashSet<>();
}

