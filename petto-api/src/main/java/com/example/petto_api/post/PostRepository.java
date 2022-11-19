package com.example.petto_api.post;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface PostRepository extends CrudRepository<PostModel, Integer> {
    PostModel findById(int id);
    PostModel findByTitle(String title);
    ArrayList<PostModel> findAll();
}
