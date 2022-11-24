package com.example.petto_api.post;

import com.example.petto_api.seeder.Seeder;
import com.example.petto_api.tag.TagModel;
import com.example.petto_api.tag.TagService;
import com.example.petto_api.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashSet;
import java.util.Set;


@Component
public class PostSeeder implements Seeder {
    @Autowired
    private PostService postService;

    @Autowired
    private TagService tagService;

    @Autowired
    public UserService userService;

    @Override
    public void seed() {
        Object [][]posts = {
            {
                1,  // owner id
                "走失",  // title
                "請問誰家的阿吉走丟了？\n黑白吉娃娃\n身上有橘色的項圈\n但沒晶片\n躲在我們公司",  // content
                "text",  // mode
                "2022-11-11 11:11:11",  // timestamp
                new int[] {1, 6},  // tags
            },
        };

        if (postService.count() == 0) {
            PostModel postModel;
            Set<TagModel> tags = new HashSet<>();
            for (Object[] post : posts) {
                postModel = new PostModel();
                postModel.setUserModel(userService.findUserById((int)post[0]));
                postModel.setTitle((String) post[1]);
                postModel.setContent((String) post[2]);
                postModel.setMode((String) post[3]);
                try {
                    postModel.setTimestamp(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse((String)post[4]));
                }
                catch (ParseException ignored) {
                    ;
                }
                for (int tagId : (int[])post[5]) {
                    tags.add(tagService.findById(tagId));
                }
                postModel.setTags(tags);
                postService.addPost(postModel);
            }
        }
    }
}
