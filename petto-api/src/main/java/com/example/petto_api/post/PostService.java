package com.example.petto_api.post;

import com.example.petto_api.reply.ReplyModel;
import com.example.petto_api.reply.ReplyService;
import com.example.petto_api.user.UserModel;
import com.example.petto_api.user.UserService;
import com.example.petto_api.vote.VoteModel;
import com.example.petto_api.vote.VoteOptionStatistics;
import com.example.petto_api.vote.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContextException;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ReplyService replyService;

    @Autowired
    private UserGivenEmojiService userGivenEmojiService;

    @Autowired
    private UserService userService;

    @Autowired
    private VoteService voteService;

    public Integer addPost(PostModel post) {
        PostModel newPost = postRepository.save(post);
        return newPost.getId();
    }
    public Boolean hasPostId(int id){return postRepository.existsById(id); }

    public void countEmojis(PostModel post) {
        post.setEmojis(userGivenEmojiService.countEmojiByPost(post));
    }

    public Boolean isOwner(int userId,int postId){
        PostModel post = postRepository.findById(postId);
        return post.getUserModel().getId() == userId;
    }

    public void setOwner(PostModel post) {
        post.setUsername(post.getUserModel().getUsername());
    }

    public void setReplyOwner(PostModel post) {
        Set<ReplyModel> replies = post.getReplies();
        for (ReplyModel reply : replies) {
            replyService.setOwner(reply);
        }
    }

    public void setVoteOptions(PostModel post) {
        if (!post.getMode().equals("vote")) {
            return ;
        }
        Map<String, Integer> voteResult = new HashMap<>();
        Set<VoteModel> allOptions = post.getOptions();
        List<VoteOptionStatistics> result = voteService.countOptionResult(post);
        for (VoteModel option : allOptions) {
            String text = option.getText();
            int count = 0;
            for (VoteOptionStatistics s : result) {
                if (option.getId() == s.getId()) {
                    count = (int) s.getCount();
                    break;
                }
            }
            voteResult.put(text, count);
        }
        post.setVoteResult(voteResult);
    }

    public void setPostAttributes(PostModel post) {
        if (post == null) {
            return ;
        }
        this.countEmojis(post);
        this.setOwner(post);
        this.setVoteOptions(post);
        this.setReplyOwner(post);
    }

    public PostModel getPostById(int id){
        PostModel post = postRepository.findById(id);
        this.setPostAttributes(post);
        return post;
    }

    public void deletePostById(int id) {
        try{
            postRepository.deleteById(id);
        }
            catch(DataAccessException e){
            throw new ApplicationContextException("error",e);
            }
    }

    public ArrayList<PostModel> getAllPosts(){
        ArrayList<PostModel> posts = postRepository.findAll();
        for (PostModel post : posts) {
            this.setPostAttributes(post);
        }
        return posts;
    }

    public ArrayList<PostModel> getAllPosts(UserModel user){
        ArrayList<PostModel> posts = postRepository.findByUserModel(user);
        for (PostModel post : posts) {
            this.setPostAttributes(post);
        }
        return posts;
    }

    public boolean userHasKeptPost(UserModel user, PostModel post) {
        Set<PostModel> userKeepingPosts = user.getKeepingPosts();
        for (PostModel p : userKeepingPosts) {
            if (p.getId() == post.getId()) {
                return true;
            }
        }
        return false;
    }

    public Set<PostModel> getKeepingPost(UserModel user) {
        Set<PostModel> posts = user.getKeepingPosts();
        for (PostModel post : posts) {
            this.setPostAttributes(post);
        }
        return posts;
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
