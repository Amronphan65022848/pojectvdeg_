package com.example.smart.VDEG.controller;

import com.example.smart.VDEG.entity.BudgetSummary;
import com.example.smart.VDEG.service.BudgetSummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/budget-summary")
public class BudgetSummaryController {

    @Autowired
    private BudgetSummaryService budgetSummaryService;

    // Create new budget summary
    @PostMapping
    public ResponseEntity<BudgetSummary> createBudgetSummary(@RequestBody BudgetSummary budgetSummary) {
        BudgetSummary newBudgetSummary = budgetSummaryService.createBudgetSummary(budgetSummary);
        return ResponseEntity.ok(newBudgetSummary);
    }

    // Get all budget summaries
    @GetMapping
    public ResponseEntity<List<BudgetSummary>> getAllBudgetSummaries() {
        List<BudgetSummary> budgetSummaries = budgetSummaryService.getAllBudgetSummaries();
        return ResponseEntity.ok(budgetSummaries);
    }

    // Get specific budget summary by ID
    @GetMapping("/{id}")
    public ResponseEntity<BudgetSummary> getBudgetSummaryById(@PathVariable("id") Long id) {
        Optional<BudgetSummary> budgetSummary = budgetSummaryService.getBudgetSummaryById(id);
        return budgetSummary.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get budget summaries by activity ID
    @GetMapping("/activity/{activityId}")
    public ResponseEntity<List<BudgetSummary>> getBudgetSummariesByActivityId(@PathVariable("activityId") Long activityId) {
        List<BudgetSummary> budgetSummaries = budgetSummaryService.getBudgetSummariesByActivityId(activityId);
        
        // แสดงเฉพาะฟิลด์ที่ต้องการ
        List<BudgetSummary> filteredSummaries = budgetSummaries.stream().map(summary -> {
            BudgetSummary filtered = new BudgetSummary();
            filtered.setBudgetId(summary.getBudgetId());
            filtered.setItem(summary.getItem());
            filtered.setBudgetGiven(summary.getBudgetGiven());
            filtered.setBudgetUsed(summary.getBudgetUsed());
            filtered.setRemainingBudget(summary.getRemainingBudget());
            return filtered;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(filteredSummaries);
    }

    // Update budget summary
    @PutMapping("/{id}")
    public ResponseEntity<BudgetSummary> updateBudgetSummary(@PathVariable("id") Long id, @RequestBody BudgetSummary budgetSummaryDetails) {
        BudgetSummary updatedBudgetSummary = budgetSummaryService.updateBudgetSummary(id, budgetSummaryDetails);
        return ResponseEntity.ok(updatedBudgetSummary);
    }

    // Delete budget summary
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBudgetSummary(@PathVariable("id") Long id) {
        budgetSummaryService.deleteBudgetSummary(id);
        return ResponseEntity.noContent().build();
    }
}
