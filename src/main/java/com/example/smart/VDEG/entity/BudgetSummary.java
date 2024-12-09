package com.example.smart.VDEG.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetSummary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long budgetId;

    @Column(nullable = false)
    private String item;

    @Column(nullable = false)
    private Double budgetGiven;

    @Column(nullable = false)
    private Double budgetUsed;

    @Column(nullable = false)
    private Double remainingBudget;

    // กำหนดความสัมพันธ์ Many-to-One กับตาราง Activity
    @ManyToOne
    @JoinColumn(name = "activity_id", nullable = false)
    private Activity activity;
}