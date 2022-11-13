package com.example.petto_api.article;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
public interface ArticleRepository extends CrudRepository<ArticleModel, Integer> {

    ArticleModel findById(int id);

    ArticleModel findByUsername(String username);

    ArticleModel findByTitle(String title);

    ArrayList<ArticleModel> findAll();

}
