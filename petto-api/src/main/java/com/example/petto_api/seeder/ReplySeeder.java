package com.example.petto_api.seeder;

import com.example.petto_api.post.PostService;
import com.example.petto_api.reply.ReplyModel;
import com.example.petto_api.reply.ReplyService;
import com.example.petto_api.user.UserService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;


@Component
public class ReplySeeder implements Seeder{
    @Autowired
    private PostService postService;

    @Autowired
    private ReplyService replyService;

    @Autowired
    private UserService userService;

    @Override
    public void seed() {
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<Reply>> typeReference = new TypeReference<List<Reply>>(){};
        InputStream inputStream = TypeReference.class.getResourceAsStream("/json/replies.json");
        List<Reply> replies = new ArrayList<>();
        try {
            replies  = mapper.readValue(inputStream, typeReference);
        }
        catch (Exception ignored) {
            ;
        }
        ReplyModel reply;
        for (Reply r : replies) {
            reply = new ReplyModel();
            reply.setPostModel(postService.getPostById(r.getPost()));
            reply.setContent(r.getContent());
            reply.setUserModel(userService.getUserById(r.getOwner()));
            try {
                reply.setTimestamp(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(r.getTimestamp()));
            }
            catch (ParseException ignored) {
                ;
            }
            replyService.addReply(reply);
        }
    }
}
