package com.example.smart.VDEG.controller;

import com.example.smart.VDEG.entity.Donation;
import com.example.smart.VDEG.service.DonationService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/donations")
public class DonationController {

    @Autowired
    private DonationService donationService;

    // Create a new donation
    @PostMapping
    public ResponseEntity<Donation> createDonation(@RequestBody Donation donation) {
        Donation newDonation = donationService.createDonation(donation);
        return ResponseEntity.ok(newDonation);
    }

    // Get all donations
    @GetMapping
    public ResponseEntity<List<Donation>> getAllDonations() {
        List<Donation> donations = donationService.getAllDonations();
        return ResponseEntity.ok(donations);
    }

    // Get donation by ID
    @GetMapping("/{id}")
    public ResponseEntity<Donation> getDonationById(@PathVariable("id") Long id) {
        Optional<Donation> donation = donationService.getDonationById(id);
        if (donation.isPresent()) {
            return ResponseEntity.ok(donation.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update donation by ID
    @PutMapping("/{id}")
    public ResponseEntity<Donation> updateDonation(@PathVariable("id") Long id, @RequestBody Donation updatedDonation) {
        Donation donation = donationService.updateDonation(id, updatedDonation);
        if (donation != null) {
            return ResponseEntity.ok(donation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete donation by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonation(@PathVariable("id") Long id) {
        donationService.deleteDonation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/activity/{activityId}")
    public ResponseEntity<List<Map<String, Object>>> getDonationsByActivityId(@PathVariable("activityId") Long activityId) {
        List<Map<String, Object>> donations = donationService.getDonationsByActivityId(activityId);
        return ResponseEntity.ok(donations);
    }
}
