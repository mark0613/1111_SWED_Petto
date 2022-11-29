package com.example.petto_api.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.validation.ConstraintViolationException;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceTest {
    UserModel user;

    @Autowired
    UserService userService;

    @BeforeEach
    void setup() {
        long timestamp = System.currentTimeMillis();
        user = new UserModel();
        String email = "test" + timestamp + "@example.com";
        String username = "test" + timestamp;
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword("aabbcc123");
    }

    @Test
    void testAddUser() {
        userService.addUser(user);
        assertNotNull(userService.getUserByEmail(user.getEmail()));
        assertNotNull(userService.getUserByUsername(user.getUsername()));
    }

    @Test
    void avoidDoubleRegistrations() {
        UserModel user = this.user;

        userService.addUser(user);
        try {
            userService.addUser(user);
        }
        catch (ConstraintViolationException e) {
            String msg = e.getMessage();
            assertTrue(msg.contains("信箱已經存在，請換一組!"));
            assertTrue(msg.contains("帳號已經存在，請換一組!"));
        }
    }
}
