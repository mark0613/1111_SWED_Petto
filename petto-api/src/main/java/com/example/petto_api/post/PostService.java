package com.example.petto_api.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;
import java.util.Set;


@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private Validator validator;

    public Integer addPost(PostModel post) {
        PostModel newPost = postRepository.save(post);
        return newPost.getId();
    }

    public PostModel getPostById(int id){
        return postRepository.findById(id);
    }

    public ArrayList<PostModel> getPosts(){
        return postRepository.findAll();
    }

    public long count() {
        return postRepository.count();
    }
}
