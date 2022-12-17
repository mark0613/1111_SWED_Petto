package com.example.petto_api.seeder;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Reply {
    private int post;
    private String content;
    private int owner;
    private String timestamp;
}
