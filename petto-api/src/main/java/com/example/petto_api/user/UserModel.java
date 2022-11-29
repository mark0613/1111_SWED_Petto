package com.example.petto_api.user;


import java.util.*;

import com.example.petto_api.post.UserGivenEmojiModel;
import com.example.petto_api.post.PostModel;
import com.example.petto_api.reply.ReplyModel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "user")
@Getter @Setter
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    @NotBlank(message = "帳號不可為空!")
    @UniqueUsername(message = "帳號已經存在，請換一組!")
    private String username;

    @Column(unique = true)
    @Email(message = "信箱格式錯誤!")
    @NotBlank(message = "信箱不可為空!")
    @UniqueEmail(message = "信箱已經存在，請換一組!")
    private String email;

    @Column
    @NotBlank(message = "密碼不可為空!")
    private String password;

    @Column
    private String type = "member";

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.MERGE, mappedBy = "userModel")
    @EqualsAndHashCode.Exclude
    private Set<PostModel> postModels;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.MERGE, mappedBy = "userModel")
    @EqualsAndHashCode.Exclude
    private Set<ReplyModel> replyModels;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.MERGE, mappedBy = "user")
    private Set<UserGivenEmojiModel> givenEmojis;
}
