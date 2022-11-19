package com.example.petto_api.Emoji;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter @Setter
public class EmojiAddRequest {
    private Set<String> emojis;
}
