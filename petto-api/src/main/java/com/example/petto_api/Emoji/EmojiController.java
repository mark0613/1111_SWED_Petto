package com.example.petto_api.Emoji;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


@Controller
@RequestMapping("/api")
public class EmojiController {
    @Autowired
    private EmojiService emojiService;

    @PostMapping("/emojis/add")
    public ResponseEntity<Map<String, Object>> addEmojis(EmojiAddRequest request) {
        ArrayList<String> invalidType = new ArrayList<>();
        for (String type : request.getEmojis()) {
            EmojiModel emoji = new EmojiModel();
            emoji.setType(type);
            try {
                emojiService.addEmoji(emoji);
            }
            catch (DuplicateEmojiException e) {
                invalidType.add(type);
            }
        }

        String message;
        if (invalidType.size() > 0) {
            message = "重複的 Emoji 種類 [" + String.join(", ", invalidType) + "] 無法添加，其餘已加入!";
        }
        else {
            message = "新增完畢!";
        }
        Map<String, Object> response = new HashMap<>();
        response.put("message", message);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
