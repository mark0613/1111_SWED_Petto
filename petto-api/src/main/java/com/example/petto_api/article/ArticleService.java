package com.example.petto_api.article;

import com.example.petto_api.user.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import java.util.ArrayList;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;
import java.util.ArrayList;
import java.util.Set;
@Service
public class ArticleService {
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private Validator validator;

    public Integer addArticle(ArticleModel article) {
        Set<ConstraintViolation<ArticleModel>> violations = validator.validate(article);
        if (!violations.isEmpty()) {
            StringBuilder sb = new StringBuilder();
            for (ConstraintViolation<ArticleModel> constraintViolation : violations) {
                sb.append(constraintViolation.getMessage());
            }
            throw new ConstraintViolationException(sb.toString(), violations);
        }
        ArticleModel newArticle = articleRepository.save(article);
        return newArticle.getId();
    }

    public ArticleModel getArticleById(int id){
        return articleRepository.findById(id);
    }

    public ArrayList<ArticleModel> getAllArticle(){
        return articleRepository.findAll();
    }

}
