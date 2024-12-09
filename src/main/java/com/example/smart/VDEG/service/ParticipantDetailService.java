package com.example.smart.VDEG.service;

import com.example.smart.VDEG.entity.Activity;
import com.example.smart.VDEG.entity.ParticipantDetail;
import com.example.smart.VDEG.repository.ActivityRepository;
import com.example.smart.VDEG.repository.ParticipantDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ParticipantDetailService {

    @Autowired
    private ParticipantDetailRepository participantDetailRepository;

    @Autowired
    private ActivityRepository activityRepository;

    // Create or Update
    public ParticipantDetail saveOrUpdateParticipantDetail(ParticipantDetail participantDetail) {
        return participantDetailRepository.save(participantDetail);
    }

    // Read (Get by ID)
    public Optional<ParticipantDetail> getParticipantDetailById(Long id) {
        return participantDetailRepository.findById(id);
    }


    public List<ParticipantDetail> getParticipantDetailsByActivityId(Long activityId) {
        List<Object[]> partialDetails = participantDetailRepository.findPartialParticipantDetailsByActivityId(activityId);

        // แปลง Object[] เป็น ParticipantDetail
        return partialDetails.stream().map(obj -> {
            ParticipantDetail participantDetail = new ParticipantDetail();
            participantDetail.setId((Long) obj[0]);
            participantDetail.setFirstName((String) obj[1]);
            participantDetail.setLastName((String) obj[2]);
            participantDetail.setPhoneNumber((String) obj[3]);
            participantDetail.setAllergies((String) obj[4]);
            participantDetail.setMedicalHistory((String) obj[5]);
            participantDetail.setEmergencyContact((String) obj[6]);
            return participantDetail;
        }).collect(Collectors.toList());
    }

    // Read (Get all)
    public List<ParticipantDetail> getAllParticipantDetails() {
        return participantDetailRepository.findAll();
    }

    // Delete by ID
    public void deleteParticipantDetail(Long id) {
        participantDetailRepository.deleteById(id);
    }

 public boolean isPersonRegisteredForActivity(Long activityId, Long personId) {
        Optional<Activity> activity = activityRepository.findById(activityId);
        if (activity.isEmpty()) {
            return false; // หรือจัดการในกรณีที่ activity ไม่พบ
        }

        Optional<ParticipantDetail> participantDetail = participantDetailRepository.findByActivityAndPersonId(activity.get(), personId);
        return participantDetail.isPresent();
    }

}
