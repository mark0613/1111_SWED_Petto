package com.example.petto_api.tag;

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
public class TagController {
    @Autowired
    private TagService tagService;

    @PostMapping("/tags")
    public ResponseEntity<Map<String, Object>> addTags(TagsAddRequest request){
        ArrayList<String> invalidText = new ArrayList<>();
        for (String text : request.getTags()) {
            TagModel tag = new TagModel();
            tag.setText(text);
            try {
                tagService.addTag(tag);
            }
            catch (DuplicateTagException e) {
                invalidText.add(text);
            }
        }

        String message;
        if (invalidText.size() > 0) {
            message = "重複的 Tag [" + String.join(", ", invalidText) + "] 無法添加，其餘已加入!";
        }
        else {
            message = "新增完畢!";
        }
        Map<String, Object> response = new HashMap<>();
        response.put("message", message);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
