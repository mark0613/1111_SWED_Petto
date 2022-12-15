package com.example.petto_api.post;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Getter  @Setter
public class PostCreatedRequest {
    String jwt;
    String title;
    String content;
    String mode;
    Set<Integer> tags = new HashSet<>();
    List<String> options = new ArrayList<>();
}
