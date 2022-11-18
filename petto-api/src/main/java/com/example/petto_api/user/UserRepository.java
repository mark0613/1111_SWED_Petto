package com.example.petto_api.user;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<UserModel, Integer> {
    UserModel findById(int id);
    UserModel findByEmail(String email);
    UserModel findByUsername(String username);
    UserModel findByEmailOrUsername(String email, String username);
}
