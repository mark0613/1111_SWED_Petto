package com.example.petto_api.post;

import lombok.Getter;
import lombok.Setter;


@Getter  @Setter
public class PostRequest {
    String jwt;
    String title;
    String content;
    String mode;
    String [] tags;
}
