package com.example.smart.VDEG.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.smart.VDEG.entity.Person;
import com.example.smart.VDEG.repository.PersonRepository;
import com.example.smart.VDEG.service.token.JwtUtil;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public String login(String email, String password) {
        Optional<Person> optionalPerson = personRepository.findByEmail(email); // ใช้ Optional ในการจัดการค่าที่อาจไม่พบ
        if (optionalPerson.isPresent()) {
            Person person = optionalPerson.get();
            if (person.getPassword().equals(password)) {
                return jwtUtil.generateToken(person.getId(),person.getEmail(), person.getFirstName(), person.getLastName(),
                        person.getEmail(), person.getRole(), person.getPhone(), person.getImageprofile(),
                        person.getContact(), person.getIllness(), person.getAllergies(), person.getReligion(),
                        person.getFoodallergies());
            } else {
                throw new RuntimeException("Invalid password");
            }
        } else {
            throw new RuntimeException("Email not found");
        }
    }

    public Person savePerson(Person person) {
        return personRepository.save(person);
    }

    public Optional<Person> getPersonById(Long id) {
        return personRepository.findById(id);
    }

    // Retrieve all people
    public Iterable<Person> getAllPeople() {
        return personRepository.findAll();
    }

    // Delete a person by id
    public void deletePerson(Long id) {
        personRepository.deleteById(id);
    }

    public boolean existsByEmail(String email) {
        Optional<Person> person = personRepository.findByEmail(email);
        return person.isPresent();
    }

    public boolean updatePassword(String email, String newPassword) {
        Optional<Person> optionalPerson = personRepository.findByEmail(email);
        if (optionalPerson.isPresent()) {
            Person person = optionalPerson.get();
            person.setPassword(newPassword); // Set new password
            personRepository.save(person); // Save updated person
            return true;
        } else {
            throw new RuntimeException("Email not found");
        }
    }

    public Person updatePersonName(Long id, String newFirstName, String newLastName) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Person not found with id " + id));

        person.setFirstName(newFirstName);
        person.setLastName(newLastName);

        return personRepository.save(person);
    }

    public Person updatePersonDetails(Long id, String email, Long phone, Long contact, String illness,
            String allergies, String religion, String foodallergies) {
        // ค้นหาบุคคลจากฐานข้อมูลตาม id
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Person not found with id " + id));

        person.setId(id);
        person.setEmail(email);
        person.setPhone(phone);
        person.setContact(contact);
        person.setIllness(illness);
        person.setAllergies(allergies);
        person.setReligion(religion);
        person.setFoodallergies(foodallergies);

        // บันทึกการเปลี่ยนแปลง
        return personRepository.save(person);
    }
}