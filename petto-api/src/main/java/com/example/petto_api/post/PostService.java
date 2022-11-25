package com.example.petto_api.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;


@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public Integer addPost(PostModel post) {
        PostModel newPost = postRepository.save(post);
        return newPost.getId();
    }

    public PostModel getPostById(int id){
        return postRepository.findById(id);
    }

    public ArrayList<PostModel> getAllPosts(){
        return postRepository.findAll();
    }

    public long count() {
        return postRepository.count();
    }
}
