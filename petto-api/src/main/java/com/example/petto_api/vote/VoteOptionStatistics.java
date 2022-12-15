package com.example.petto_api.vote;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter @Setter
@AllArgsConstructor
public class VoteOptionStatistics {
    private int id;
    private String text;
    private long count;
}
