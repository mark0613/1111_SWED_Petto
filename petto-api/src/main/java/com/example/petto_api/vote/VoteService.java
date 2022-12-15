package com.example.petto_api.vote;

import com.example.petto_api.post.PostModel;
import com.example.petto_api.user.UserModel;
import com.example.petto_api.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class VoteService {
    @Autowired
    private UserService userService;

    @Autowired
    private VoteRepository voteRepository;

    public Integer addOption(VoteModel vote) {
        VoteModel option = voteRepository.save(vote);
        return option.getId();
    }

    public VoteModel getVoteOptionById(int id) {
        return voteRepository.findById(id);
    }

    public Set<VoteModel> getOptionsByPost(PostModel post) {
        return voteRepository.findByPost(post);
    }

    public Boolean hasOptionId(int id){
        return voteRepository.existsById(id);
    }

    public Set<VoteModel> getUserVoting(UserModel user) {
        return user.getVotingOption();
    }

    public List<VoteOptionStatistics> countOptionResult(PostModel post) {
        if (post == null) {
            return null;
        }
        return voteRepository.countOptionResult(post);
    }

    public void vote(UserModel user, VoteModel option) throws UserHasVotingException, OptionNotExistException {
        Set<VoteModel> userVotingOption = this.getUserVoting(user);
        if (!hasOptionId(option.getId())) {
            throw new OptionNotExistException();
        }
        for (VoteModel record : userVotingOption) {
            if (record.getPost().getId() == option.getPost().getId()) {
                throw new UserHasVotingException();
            }
        }
        userVotingOption.add(option);
        userService.updateUser(user);
    }
}
