package com.example.petto_api.Tag;


import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter @Setter
public class TagsAddRequest {
    Set<String> tags;
}
