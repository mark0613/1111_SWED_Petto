package com.example.petto_api.reply;

import com.example.petto_api.post.PostModel;
import com.example.petto_api.user.UserModel;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Table(name="reply")
@Getter @Setter
public class ReplyModel {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(columnDefinition="TEXT")
  @NotBlank(message = "內容不可為空!")
  private String content;

  @Column
  @NotBlank(message = "時戳不可為空!")
  private Date timestamp;

  @JsonBackReference
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name="post_id")
  private PostModel postModel;

  @JsonBackReference
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name="owner")
  private UserModel userModel;
}
