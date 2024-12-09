package com.example.smart.VDEG.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.smart.VDEG.entity.Person;
import com.example.smart.VDEG.service.PersonService;

import java.util.Map;
import java.util.Optional;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class PersonController {

    @Autowired
    private PersonService personService;

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        return personService.login(email, password);
    }


    // Create or update a person
    @PostMapping
    public ResponseEntity<Person> createOrUpdatePerson(@RequestBody Person person) {
        Person savedPerson = personService.savePerson(person);
        return new ResponseEntity<>(savedPerson, HttpStatus.CREATED);
    }

    // Retrieve a person by id
    @GetMapping("/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable("id") Long id) {
        Optional<Person> person = personService.getPersonById(id);
        return person.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Retrieve all people
    @GetMapping
    public ResponseEntity<Iterable<Person>> getAllPeople() {
        Iterable<Person> people = personService.getAllPeople();
        return ResponseEntity.ok(people);
    }

    // Delete a person by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePerson(@PathVariable("id") Long id) {
        personService.deletePerson(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check-email")
    public ResponseEntity<String> checkEmail(@RequestParam("email") String email) {
        boolean exists = personService.existsByEmail(email);
        if (exists) {
            return ResponseEntity.ok("Email exists in the database.");
        } else {
            return ResponseEntity.status(404).body("Email not found.");
        }
    }

    @PutMapping("/update-password")
    public ResponseEntity<String> updatePassword(
            @RequestParam("email") String email, 
            @RequestParam("newPassword") String newPassword) {
        try {
            boolean success = personService.updatePassword(email, newPassword);
            if (success) {
                return ResponseEntity.ok("Password updated successfully.");
            } else {
                return ResponseEntity.status(400).body("Password update failed.");
            }
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
    // Update person firstName lastName
    @PutMapping("/{id}/update-name")
    public ResponseEntity<Person> updatePersonName(
            @PathVariable Long id, 
            @RequestParam String firstName, 
            @RequestParam String lastName) {
        
        Person updatedPerson = personService.updatePersonName(id, firstName, lastName);
        return ResponseEntity.ok(updatedPerson);
    }


    // Update person details
    @PutMapping("/{id}/update-details")
    public ResponseEntity<Person> updatePersonDetails(
            @PathVariable Long id,
            @RequestBody Person updateRequest) {  // ใช้ Person โดยตรงใน @RequestBody
        
        Person updatedPerson = personService.updatePersonDetails(
            id,
            updateRequest.getEmail(),
            updateRequest.getPhone(),
            updateRequest.getContact(),
            updateRequest.getIllness(),
            updateRequest.getAllergies(),
            updateRequest.getReligion(),
            updateRequest.getFoodallergies()
        );
        return ResponseEntity.ok(updatedPerson);
    }
}