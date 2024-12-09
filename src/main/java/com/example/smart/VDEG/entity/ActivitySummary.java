package com.example.smart.VDEG.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivitySummary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long summaryId;

    @Column(columnDefinition = "TEXT", nullable = true)
    private String mediaAndPropsDepartment;

    @Column(columnDefinition = "TEXT", nullable = true)
    private String locationDepartment;

    @Column(columnDefinition = "TEXT", nullable = true)
    private String cons;

    @Column(columnDefinition = "TEXT", nullable = true)
    private String problemsFaced;

    @Column(columnDefinition = "TEXT", nullable = true)
    private String solutionsToProblems;

    // ความสัมพันธ์ Many-to-One กับตาราง Activity
    @ManyToOne
    @JoinColumn(name = "activity_id", nullable = false)
    private Activity activity;
}
