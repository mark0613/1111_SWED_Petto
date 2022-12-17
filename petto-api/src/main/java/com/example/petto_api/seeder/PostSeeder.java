package com.example.petto_api.seeder;

import com.example.petto_api.emoji.EmojiModel;
import com.example.petto_api.emoji.EmojiService;
import com.example.petto_api.post.PostModel;
import com.example.petto_api.post.PostService;
import com.example.petto_api.post.UserGivenEmojiModel;
import com.example.petto_api.post.UserGivenEmojiService;
import com.example.petto_api.seeder.Seeder;
import com.example.petto_api.tag.TagModel;
import com.example.petto_api.tag.TagService;
import com.example.petto_api.user.UserModel;
import com.example.petto_api.user.UserService;
import com.example.petto_api.vote.VoteModel;
import com.example.petto_api.vote.VoteService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Component
public class PostSeeder implements Seeder {
    @Autowired
    private EmojiService emojiService;

    @Autowired
    private PostService postService;

    @Autowired
    private TagService tagService;

    @Autowired
    private UserGivenEmojiService userGivenEmojiService;

    @Autowired
    private UserService userService;

    @Autowired
    private VoteService voteService;

    @Override
    public void seed() {
        seedPostsData();
        seedPostEmojiData();
    }

    public void seedPostsData() {
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<Post>> typeReference = new TypeReference<List<Post>>(){};
        InputStream inputStream = TypeReference.class.getResourceAsStream("/json/posts.json");
        List<Post> posts = new ArrayList<>();
        try {
           posts  = mapper.readValue(inputStream, typeReference);
        }
        catch (Exception ignored) {
            ;
        }

        if (postService.count() == 0) {
            PostModel postModel;
            Set<TagModel> tags;
            for (Post p : posts) {
                tags = new HashSet<>();
                postModel = new PostModel();
                postModel.setUserModel(userService.getUserById(p.getOwner()));
                postModel.setTitle(p.getTitle());
                postModel.setContent(p.getContent());
                postModel.setMode(p.getMode());
                Set<VoteModel> vote = new HashSet<>();
                if (p.getMode().equals("vote")) {
                    VoteModel option;
                    for (String text : p.getOptions()) {
                        option = new VoteModel();
                        option.setPost(postModel);
                        option.setText(text);
                        vote.add(option);
                    }
                    postModel.setOptions(vote);
                }
                try {
                    postModel.setTimestamp(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(p.getTimestamp()));
                }
                catch (ParseException ignored) {
                    ;
                }
                for (int tagId : p.getTags()) {
                    tags.add(tagService.getTagById(tagId));
                }
                postModel.setTags(tags);
                postService.addPost(postModel);
            }
        }
    }

    public void seedPostEmojiData() {
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<UserEmojiPost>> typeReference = new TypeReference<List<UserEmojiPost>>(){};
        InputStream inputStream = TypeReference.class.getResourceAsStream("/json/user_emoji_post.json");
        List<UserEmojiPost> userGivenEmojiOnPost = new ArrayList<>();
        try {
            userGivenEmojiOnPost = mapper.readValue(inputStream, typeReference);
        }
        catch (Exception ignored) {
            ;
        }

        UserModel user;
        EmojiModel emoji;
        PostModel post;
        UserGivenEmojiModel record;
        for (UserEmojiPost row : userGivenEmojiOnPost) {
            user = userService.getUserById(row.getUser());
            emoji = emojiService.getEmojiById(row.getEmoji());
            post = postService.getPostById(row.getPost());
            record = new UserGivenEmojiModel();
            record.setUser(user);
            record.setEmoji(emoji);
            record.setPost(post);
            userGivenEmojiService.add(record);
        }
    }
}
