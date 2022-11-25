package com.example.petto_api.post;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter @Setter
@AllArgsConstructor
public class PostContainEmojis {
    private int id;
    private String type;
    private long count;
}
