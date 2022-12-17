package com.example.petto_api.seeder;

import com.example.petto_api.user.UserModel;
import com.example.petto_api.user.UserService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;


@Component
public class UserSeeder implements Seeder {
    @Autowired
    private UserService userService;

    @Override
    public void seed() {
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<User>> typeReference = new TypeReference<List<User>>(){};
        InputStream inputStream = TypeReference.class.getResourceAsStream("/json/users.json");
        List<User> users = new ArrayList<>();
        try {
            users = mapper.readValue(inputStream, typeReference);
        }
        catch (Exception ignored) {
            ;
        }
        if (userService.count() == 0) {
            UserModel user;
            for (User u : users) {
                user = new UserModel();
                user.setEmail(u.getEmail());
                user.setUsername(u.getUsername());
                user.setPassword(u.getPassword());
                user.setType(u.getType());
                userService.addUser(user);
            }
        }
    }
}
