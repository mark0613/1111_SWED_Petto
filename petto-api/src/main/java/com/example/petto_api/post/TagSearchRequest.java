package com.example.petto_api.post;

import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter @Setter
public class TagSearchRequest {
    private Set<Integer> tags = new HashSet<>();
}
