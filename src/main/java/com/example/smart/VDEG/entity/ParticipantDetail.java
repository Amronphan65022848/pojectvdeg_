package com.example.smart.VDEG.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = true)
    private String allergies;

    @Column(nullable = true)
    private String medicalHistory;

    @Column(nullable = false)
    private String emergencyContact;

    // เชื่อมโยงกับ Activity แบบ Many-to-One
    @ManyToOne
    @JoinColumn(name = "activity_id", nullable = false)
    private Activity activity;

    @ManyToOne
    @JoinColumn(name = "person_id", nullable = false)
    private Person person;
}
