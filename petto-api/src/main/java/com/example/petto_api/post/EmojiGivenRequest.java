package com.example.petto_api.post;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;


@Getter @Setter
public class EmojiGivenRequest {
    private String jwt;
    private int post_id;
    private int emoji_id;

    public int getPostId() {
        return post_id;
    }

    public int getEmojiId() {
        return emoji_id;
    }
}
