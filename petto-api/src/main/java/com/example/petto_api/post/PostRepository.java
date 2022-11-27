package com.example.petto_api.post;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface PostRepository extends CrudRepository<PostModel, Integer> {
    PostModel findById(int id);
    Boolean existsById(int id);
    @Modifying
    @Query("delete from PostModel post  where post.id=:id")
    void deleteById(@Param("id") int id);



    ArrayList<PostModel> findAll();
}
