package com.example.petto_api.user;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class UserSeeder implements CommandLineRunner {
    @Autowired
    private UserService userService;

    @SneakyThrows
    @Override
    public void run(String... args) throws Exception {
        seedUserData();
    }

    public void seedUserData() {
        String [][]users = {
                {"root@petto.com", "root", "aabbcc123", "admin"},
                {"admin@petto.com", "admin", "aabbcc123", "admin"},
                {"demo@petto.com", "demo", "aabbcc123", "member"},
                {"test@petto.com", "test", "aabbcc123", "member"},
        };
        if (userService.count() == 0) {
            UserModel user;
            for (String []userinfo : users) {
                user = new UserModel();
                user.setEmail(userinfo[0]);
                user.setUsername(userinfo[1]);
                user.setPassword(userinfo[2]);
                user.setType(userinfo[3]);
                userService.addUser(user);
            }
        }
    }
}
