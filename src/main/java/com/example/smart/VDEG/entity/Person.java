package com.example.smart.VDEG.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private Long phone; 

    @Column(nullable = false)
    private Long contact; 

    @Column(nullable = true)
    private String illness;

    @Column(nullable = true)
    private String allergies;

    @Column(nullable = false)
    private String religion;

    @Column(nullable = true)
    private String foodallergies;

    @Column(nullable = true)
    private String imageprofile;

    @Column(nullable = false)
    private LocalDateTime Time;

    @PrePersist
    protected void onCreate() {
        this.Time = LocalDateTime.now();
        if (this.role == null) {
            this.role = "user";
        }
    }
}