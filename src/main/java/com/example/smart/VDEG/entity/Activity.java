package com.example.smart.VDEG.entity;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long activityId;
    @Column(nullable = false)
    private String activityName;
    @Column(nullable = false)
    private String placeOfActivity;
    @Column(nullable = false)
    private boolean status = false;
    @Column(columnDefinition = "TEXT",nullable = false)  // สำหรับข้อความยาว
    private String activityDescription;
    @Column(nullable = false)
    private Integer volunteerAmount;
    @Column(nullable = true)
    private Integer totalvolunteerAmount = 0;
    @Column(nullable = false)
    private LocalDate startDate;
    @Column(nullable = false)
    private LocalDate endDate;
    @Column(nullable = false)
    private String activityImageUrl;
    @Column(columnDefinition = "TEXT", nullable = true)  // เพิ่ม columnDefinition สำหรับฟิลด์ URL
    private String informationLink;
    
    // เก็บรายชื่อ URL ของผู้สนับสนุนเป็น List ของ String
    @ElementCollection
    private List<String> sponsors;

  
}
