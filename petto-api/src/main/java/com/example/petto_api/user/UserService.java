package com.example.petto_api.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;
import java.util.Set;


@Service
@Validated
public class UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Validator validator;

    public UserModel getUserById(int id) {
        return userRepository.findById(id);
    }

    public UserModel getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserModel getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public UserModel getUserByEmailOrUsername(String account) {
        return userRepository.findByEmailOrUsername(account, account);
    }

    public Integer addUser(UserModel user) {
        Set<ConstraintViolation<UserModel>> violations = validator.validate(user);
        if (!violations.isEmpty()) {
            StringBuilder sb = new StringBuilder();
            for (ConstraintViolation<UserModel> constraintViolation : violations) {
                sb.append(constraintViolation.getMessage());
            }
            throw new ConstraintViolationException(sb.toString(), violations);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserModel newUser = userRepository.save(user);
        return newUser.getId();
    }

    public Integer updateUser(UserModel user) {
        return userRepository.save(user).getId();
    }

    public long count() {
        return userRepository.count();
    }
}
