package com.example.petto_api.post;

import com.example.petto_api.user.UserModel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.Date;

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
    private String content;

    @Column(length = 4)
    @NotBlank(message = "類型不可為空!")
    @Size(max = 4,message = "")
    private String type;

    @Column
    @NotNull
    private Date timestamp;

    @Column
    @NotNull
    private Boolean updated;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="owner")
    private UserModel userModel;

}

