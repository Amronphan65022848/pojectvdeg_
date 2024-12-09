package com.example.smart.VDEG.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.smart.VDEG.entity.Person;

import java.util.Optional;


public interface PersonRepository extends JpaRepository<Person, Long> {

    Optional<Person> findByEmail(String email);
}