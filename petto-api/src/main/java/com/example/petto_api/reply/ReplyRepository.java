package com.example.petto_api.reply;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ReplyRepository extends CrudRepository<ReplyModel, Integer> {
    ReplyModel findById(int id);
    ArrayList<ReplyModel> findAll();
}
