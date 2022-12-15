package com.example.petto_api.vote;

import com.example.petto_api.post.PostModel;
import com.example.petto_api.user.UserModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface VoteRepository extends CrudRepository<VoteModel, Integer> {
    VoteModel findById(int id);
    Set<VoteModel> findByPost(PostModel post);

    @Query(
        "SELECT new com.example.petto_api.vote.VoteOptionStatistics(v.id, v.text, count(*)) " +
        "FROM VoteModel v, UserModel u " +
        "JOIN u.votingOption ops " +
        "WHERE v.id = ops.id " +
        "AND v.post = :post " +
        "GROUP BY v.id "
    )
    List<VoteOptionStatistics> countOptionResult(PostModel post);
}
