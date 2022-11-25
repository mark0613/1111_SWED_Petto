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
  public ReplyModel getReplyById(int id) {
    return replyRepository.findById(id);
  }

  public ArrayList<ReplyModel> getAllReplies() {
    return replyRepository.findAll();
  }
}
