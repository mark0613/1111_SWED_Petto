package com.example.petto_api.post;

import com.example.petto_api.emoji.EmojiModel;
import com.example.petto_api.emoji.EmojiService;
import com.example.petto_api.seeder.Seeder;
import com.example.petto_api.tag.TagModel;
import com.example.petto_api.tag.TagService;
import com.example.petto_api.user.UserModel;
import com.example.petto_api.user.UserService;
import com.example.petto_api.vote.VoteModel;
import com.example.petto_api.vote.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
        Object [][]posts = {
            // owner id
            // title
            // content
            // mode
            // timestamp
            // tags
            // *vote options (if mode is 'vote')
            {
                1,
                "走失",
                "請問誰家的阿吉走丟了？\n黑白吉娃娃\n身上有橘色的項圈\n但沒晶片\n躲在我們公司",
                "text",
                "2022-11-11 11:11:11",
                new int[] {1, 6},
            },
            {
                2,
                "飼主最常對愛貓有疑問的3大行為",
                "1、貓咪是獨立的動物，不太需要陪伴？\nNO！NO！長時間的分離可能會導致貓咪有分離焦慮症。\n如果你的愛貓時常亂尿尿、大便、嘔吐、不停的舔毛、缺乏食慾，發現你要出門就異常焦慮，看到你回家又過度興奮，這些都有可能是分離焦慮症的症狀。每天花部分的時間陪陪愛貓，不論是玩遊戲、說說話，都可以減輕牠們的壓力，讓牠們心情放鬆更開心。\n\n2、不喜歡在砂盆裡上廁所，只是耍脾氣亂尿尿？\nNO！NO！貓咪不在砂盆裡上廁所有許多原因，飼主必須探究根源，才能解決問題。有些時候牠們是透過這樣的方式表達身體上的不適或是表達心理情緒，也有可能是貓砂盆太久沒清，或是附近環境太髒，當下的處罰可能會讓愛貓害怕幾天，但是沒有找出原因的話還是會持續一直發生。\n\n3、貓咪伸爪子攻擊是天性，不用特別注意？\nNO！NO！這裡說的伸爪子攻擊跟一般的磨爪不一樣，磨爪通常會發生在貓咪剛睡醒或是想要伸展的時候，這裡指的是將爪子伸出來做攻擊的動作。貓咪的抓咬一般會被飼主當作是玩耍的一部分，其實在幼貓時期除了因為愛玩耍外，也是因為自我保護機制啟動，畢竟那是牠們唯一保護自己的方式。但是當貓咪出現頻繁的抓咬，有可能是受了刺激或是恐懼的反應，也有可能是一些藥物讓牠們不舒服，這時就要靠飼主細心的觀察才能進一步發現。",
                "text",
                "2022-11-20 11:20:41",
                new int[] {2},
            },
            {
                3,
                "取名",
                "我養了一隻法鬥，大家覺得名字要叫什麼咧",
                "vote",
                "2022-12-14 16:15:14",
                new int[] {1},
                new String[] {
                    "牛牛",
                    "黑妞",
                    "阿牛",
                    "小笨狗"
                }
            }
        };

        if (postService.count() == 0) {
            PostModel postModel;
            Set<TagModel> tags;
            for (Object[] post : posts) {
                tags = new HashSet<>();
                postModel = new PostModel();
                postModel.setUserModel(userService.getUserById((int)post[0]));
                postModel.setTitle((String) post[1]);
                postModel.setContent((String) post[2]);
                postModel.setMode((String) post[3]);
                List<VoteModel> vote = new ArrayList<>();
                if (post[3].equals("vote")) {
                    VoteModel option;
                    for (String text : (String[]) post[6]) {
                        option = new VoteModel();
                        option.setPost(postModel);
                        option.setText(text);
                        vote.add(option);
                    }
                    postModel.setOptions(vote);
                }
                try {
                    postModel.setTimestamp(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse((String)post[4]));
                }
                catch (ParseException ignored) {
                    ;
                }
                for (int tagId : (int[])post[5]) {
                    tags.add(tagService.getTagById(tagId));
                }
                postModel.setTags(tags);
                postService.addPost(postModel);
            }
        }
    }

    public void seedPostEmojiData() {
        int[][] userGivenEmojiOnPost = {
                // u, e, p
                {1, 1, 1},
                {2, 1, 1},
                {3, 3, 1},
                {1, 1, 2},
                {3, 1, 2},
                {4, 4, 2},
        };
        UserModel user;
        EmojiModel emoji;
        PostModel post;
        UserGivenEmojiModel record;
        for (int[] row : userGivenEmojiOnPost) {
            user = userService.getUserById(row[0]);
            emoji = emojiService.getEmojiById(row[1]);
            post = postService.getPostById(row[2]);
            record = new UserGivenEmojiModel();
            record.setUser(user);
            record.setEmoji(emoji);
            record.setPost(post);
            userGivenEmojiService.add(record);
        }
    }
}
