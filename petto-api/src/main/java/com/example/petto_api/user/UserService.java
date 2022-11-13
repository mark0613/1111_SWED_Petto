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

    public UserModel findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserModel findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public UserModel findByEmailOrUsername(String account) {
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

    public boolean login(String account, String password) {
        UserModel user = this.findByEmailOrUsername(account);
        if (user == null) {
            return false;
        }
//        return passwordEncoder.equals(password);
        return user.getPassword().equals(password);
    }
}