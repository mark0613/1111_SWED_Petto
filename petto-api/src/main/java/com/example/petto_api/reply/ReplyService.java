package com.example.petto_api.reply;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;

@Service
@Validated
public class ReplyService {
    @Autowired
    private ReplyRepository replyRepository;

    public Integer addReply(ReplyModel reply) {
        ReplyModel newReply = replyRepository.save(reply);
        return newReply.getId();
    }

    public void setOwner(ReplyModel reply) {
        reply.setUsername(reply.getUserModel().getUsername());
    }

    public ReplyModel getReplyById(int id) {
        ReplyModel reply = replyRepository.findById(id);
        setOwner(reply);
        return reply;
    }

    public ArrayList<ReplyModel> getAllReplies() {
        ArrayList<ReplyModel> replies = replyRepository.findAll();
        for (ReplyModel reply : replies) {
            setOwner(reply);
        }
        return replies;
    }
}
