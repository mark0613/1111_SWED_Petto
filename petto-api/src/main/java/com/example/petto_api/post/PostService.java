package com.example.petto_api.post;

import com.example.petto_api.user.UserModel;
import com.example.petto_api.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;


@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;

    public Integer addPost(PostModel post) {
        PostModel newPost = postRepository.save(post);
        return newPost.getId();
    }
    public Boolean hasPostID(int id){return postRepository.existsById(id); }

    public PostModel getPostById(int id){
        return postRepository.findById(id);
    }

    public void deletePostById(int id) {  postRepository.deleteById(id);}

    public ArrayList<PostModel> getAllPosts(){
        return postRepository.findAll();
    }

    public boolean userHasKeptPost(UserModel user, PostModel post) {
        List<PostModel> userKeepingPosts = user.getKeepingPosts();
        for (PostModel p : userKeepingPosts) {
            if (p.getId() == post.getId()) {
                return true;
            }
        }
        return false;
    }

    public void keepPost(UserModel user, PostModel post) {
        if (!this.userHasKeptPost(user, post)) {
            user.getKeepingPosts().add(post);
            userService.updateUser(user);
        }
    }

    public long count() {
        return postRepository.count();
    }
}
