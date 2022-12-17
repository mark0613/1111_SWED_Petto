package com.example.petto_api.seeder;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Getter @Setter
public class Post {
    private int owner;
    private String title;
    private String content;
    private String mode;
    private String timestamp;
    private Set<Integer> tags = new HashSet<>();
    private ArrayList<String> options = new ArrayList<>();
}
