package com.example.petto_api.post;

import com.example.petto_api.Tag.TagModel;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;


@Getter  @Setter
public class PostCreatedRequest {
    String jwt;
    String title;
    String content;
    String mode;
    Set<Integer> tags;
}
