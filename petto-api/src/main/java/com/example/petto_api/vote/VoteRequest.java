package com.example.petto_api.vote;

import lombok.Getter;
import lombok.Setter;


@Getter @Setter
public class VoteRequest {
    private String jwt;
    private int option_id;

    public int getOptionId() {
        return this.option_id;
    }
}
