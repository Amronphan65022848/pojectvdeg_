package com.example.smart.VDEG.service;

import com.example.smart.VDEG.entity.Donation;
import com.example.smart.VDEG.repository.DonationRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    // Create a new donation
    public Donation createDonation(Donation donation) {
        return donationRepository.save(donation);
    }

    // Get all donations
    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    // Get donation by ID
    public Optional<Donation> getDonationById(Long id) {
        return donationRepository.findById(id);
    }

    // Update donation by ID
    public Donation updateDonation(Long id, Donation updatedDonation) {
        Optional<Donation> existingDonation = donationRepository.findById(id);
        if (existingDonation.isPresent()) {
            Donation donation = existingDonation.get();
            donation.setFullName(updatedDonation.getFullName());
            donation.setContact(updatedDonation.getContact());
            donation.setAmount(updatedDonation.getAmount());
            donation.setSlip(updatedDonation.getSlip());
            donation.setActivity(updatedDonation.getActivity());
            return donationRepository.save(donation);
        }
        return null; // Or throw an exception if needed
    }

    // Delete donation by ID
    public void deleteDonation(Long id) {
        donationRepository.deleteById(id);
    }

    public List<Map<String, Object>> getDonationsByActivityId(Long activityId) {
        return donationRepository.findDonationsByActivityId(activityId);
    }
}
