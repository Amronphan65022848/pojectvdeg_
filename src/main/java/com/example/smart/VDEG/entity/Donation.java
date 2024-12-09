package com.example.smart.VDEG.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String FullName;

    @Column(nullable = false)
    private String Contact;

    @Column(nullable = false)
    private Double Amount;

    @Column(nullable = false)
    private String Slip;

    @Column(nullable = false)
    private LocalDateTime Time;

    // เชื่อมโยงกับ Activity แบบ Many-to-One
    @ManyToOne
    @JoinColumn(name = "activity_id", nullable = false)
    private Activity activity;

    // Method ที่จะถูกเรียกใช้ก่อนบันทึกข้อมูลใหม่
    @PrePersist
    protected void onCreate() {
        this.Time = LocalDateTime.now();
    }
}
