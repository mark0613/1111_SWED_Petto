package com.example.petto_api.reply;

import com.example.petto_api.post.PostService;
import com.example.petto_api.security.JwtTokenService;
import com.example.petto_api.user.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/api")
public class ReplyController {
  @Autowired
  private JwtTokenService jwtTokenService;

  @Autowired
  private UserService userService;

  @Autowired
  private ReplyService replyService;

  @Autowired
  private PostService postService;

  @PostMapping("/reply")
  public ResponseEntity<Map<String, Object>> post(ReplyRequest replyRequest) {
    String message;
    HttpStatus httpStatus;
    Map<String, Object> response = new HashMap<>();

    String jwt = replyRequest.getJwt();
    int post_id = replyRequest.getPost_id();
    String content = replyRequest.getContent();

    if (!jwtTokenService.validateToken(jwt)) {
      message = "權限不足!";
      response.put("message", message);
      httpStatus = HttpStatus.UNAUTHORIZED;
      return ResponseEntity.status(httpStatus).body(response);
    }

    int userId = jwtTokenService.getUserIdFromToken(jwt);

    if (StringUtils.isAnyBlank(content)) {
      message = "內容不能為空!";
      response.put("message", message);
      httpStatus = HttpStatus.BAD_REQUEST;
      return ResponseEntity.status(httpStatus).body(response);
    }

    ReplyModel replyModel = new ReplyModel();
    replyModel.setUserModel(userService.getUserById(userId));
    replyModel.setPostModel(postService.getPostById(post_id));
    replyModel.setContent(content);
    replyModel.setTimestamp(new Date());
    int reply_id = replyService.addReply(replyModel);
    message = "留言成功!";
    response.put("message", message);
    response.put("reply_id", reply_id);
    httpStatus = HttpStatus.CREATED;
    return ResponseEntity.status(httpStatus).body(response);
  }

}
