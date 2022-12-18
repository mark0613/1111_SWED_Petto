package com.example.petto_api.vote;

import com.example.petto_api.post.PostModel;
import com.example.petto_api.post.PostService;
import com.example.petto_api.security.JwtTokenService;
import com.example.petto_api.user.UserModel;
import com.example.petto_api.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;


@Controller
@RequestMapping("/api")
public class VoteController {
    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @Autowired
    private VoteService voteService;

    @GetMapping("/vote-record")
    public ResponseEntity<Map<String, Object>> userVoting(@RequestParam int post, @RequestParam int user) {
        Map<String, Object> response = new HashMap<>();
        PostModel p = postService.getPostById(post);
        UserModel u = userService.getUserById(user);
        if (p == null || u == null) {
            response.put("option", null);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }

        if (!p.getMode().equals("vote")) {
            response.put("option", null);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }

        Set<VoteModel> userVotingRecord = voteService.getUserVoting(u);
        if (userVotingRecord.size() == 0) {
            response.put("option", null);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }

        for (VoteModel record : userVotingRecord) {
            if (record.getPost().getId() == p.getId()) {
                response.put("option", record);
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }
        }
        response.put("option", null);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/vote")
    public ResponseEntity<Map<String, Object>> vote(VoteRequest request) {
        String message;
        HttpStatus httpStatus;
        Map<String, Object> response = new HashMap<>();

        String jwt = request.getJwt();
        int optionId = request.getOptionId();

        if (!jwtTokenService.validateToken(jwt)) {
            message = "權限不足!";
            response.put("message", message);
            httpStatus = HttpStatus.UNAUTHORIZED;
            return ResponseEntity.status(httpStatus).body(response);
        }

        int userId = jwtTokenService.getUserIdFromToken(jwt);
        UserModel user = userService.getUserById(userId);

        if (!voteService.hasOptionId(optionId)) {
            message = "選項不存在";
            response.put("message", message);
            httpStatus = HttpStatus.BAD_REQUEST;
            return ResponseEntity.status(httpStatus).body(response);
        }

        VoteModel option = voteService.getVoteOptionById(optionId);
        try {
            voteService.vote(user, option);
        }
        catch (OptionNotExistException e) {
            message = "選項不存在";
            response.put("message", message);
            httpStatus = HttpStatus.BAD_REQUEST;
            return ResponseEntity.status(httpStatus).body(response);
        }
        catch(UserHasVotingException e) {
            message = "已經投票";
            response.put("message", message);
            httpStatus = HttpStatus.BAD_REQUEST;
            return ResponseEntity.status(httpStatus).body(response);
        }

        message = "成功";
        response.put("message", message);
        httpStatus = HttpStatus.CREATED;
        return ResponseEntity.status(httpStatus).body(response);
    }
}
