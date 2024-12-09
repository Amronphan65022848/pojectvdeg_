package com.example.smart.VDEG.service;

import com.example.smart.VDEG.entity.BudgetSummary;
import com.example.smart.VDEG.repository.BudgetSummaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BudgetSummaryService {

    @Autowired
    private BudgetSummaryRepository budgetSummaryRepository;

    // Create new budget summary
    public BudgetSummary createBudgetSummary(BudgetSummary budgetSummary) {
        return budgetSummaryRepository.save(budgetSummary);
    }

    // Read all budget summaries
    public List<BudgetSummary> getAllBudgetSummaries() {
        return budgetSummaryRepository.findAll();
    }

    // Read specific budget summary by ID
    public Optional<BudgetSummary> getBudgetSummaryById(Long id) {
        return budgetSummaryRepository.findById(id);
    }

    // Update a budget summary
    public BudgetSummary updateBudgetSummary(Long id, BudgetSummary budgetSummaryDetails) {
        BudgetSummary budgetSummary = budgetSummaryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget Summary not found with id " + id));
        
        budgetSummary.setItem(budgetSummaryDetails.getItem());
        budgetSummary.setBudgetGiven(budgetSummaryDetails.getBudgetGiven());
        budgetSummary.setBudgetUsed(budgetSummaryDetails.getBudgetUsed());
        budgetSummary.setRemainingBudget(budgetSummaryDetails.getRemainingBudget());
        budgetSummary.setActivity(budgetSummaryDetails.getActivity());

        return budgetSummaryRepository.save(budgetSummary);
    }

    // Delete a budget summary
    public void deleteBudgetSummary(Long id) {
        BudgetSummary budgetSummary = budgetSummaryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget Summary not found with id " + id));
        budgetSummaryRepository.delete(budgetSummary);
    }

    public List<BudgetSummary> getBudgetSummariesByActivityId(Long activityId) {
        return budgetSummaryRepository.findByActivityId(activityId);
    }

    
}
