package com.example.petto_api.reply;

import lombok.Getter;
import lombok.Setter;


@Getter @Setter
public class ReplyRequest {
    String jwt;
    int post_id;
    String content;
}
