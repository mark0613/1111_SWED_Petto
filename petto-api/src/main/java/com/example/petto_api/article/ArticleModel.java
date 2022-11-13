package com.example.petto_api.article;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "article")
@Getter @Setter
public class ArticleModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    @NotBlank(message = "使用者名稱不可為空!")
    private String username;

    @Column
    @NotBlank(message = "文章標題不可為空!")
    private String title;

    @Column
    @NotBlank(message = "文章內容不可為空!")
    private String content;

    @Column
    private String type;


}

