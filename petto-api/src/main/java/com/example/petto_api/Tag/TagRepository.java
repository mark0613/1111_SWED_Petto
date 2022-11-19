package com.example.petto_api.Tag;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface TagRepository extends CrudRepository<TagModel, Integer> {
    TagModel findById(int id);
    ArrayList<TagModel> findAll();
    TagModel findByText(String text);
}
