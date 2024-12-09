package com.example.smart.VDEG.repository;

import com.example.smart.VDEG.entity.BudgetSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BudgetSummaryRepository extends JpaRepository<BudgetSummary, Long> {
    @Query("SELECT b FROM BudgetSummary b WHERE b.activity.activityId = :activityId")
    List<BudgetSummary> findByActivityId(Long activityId);
}