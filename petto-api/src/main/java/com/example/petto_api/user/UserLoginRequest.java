package com.example.petto_api.user;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserLoginRequest {
    String account;
    String password;
}
