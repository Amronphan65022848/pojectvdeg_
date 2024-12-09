package com.example.smart.VDEG.service;

import com.example.smart.VDEG.entity.ActivitySummary;
import com.example.smart.VDEG.repository.ActivitySummaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivitySummaryService {

    @Autowired
    private ActivitySummaryRepository activitySummaryRepository;

    // Create new activity summary
    public ActivitySummary createActivitySummary(ActivitySummary activitySummary) {
        return activitySummaryRepository.save(activitySummary);
    }

    // Read all activity summaries
    public List<ActivitySummary> getAllActivitySummaries() {
        return activitySummaryRepository.findAll();
    }

    // Read specific activity summary by ID
    public Optional<ActivitySummary> getActivitySummaryById(Long id) {
        return activitySummaryRepository.findById(id);
    }

    // Update an activity summary
    public ActivitySummary updateActivitySummary(Long id, ActivitySummary activitySummaryDetails) {
        ActivitySummary activitySummary = activitySummaryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity Summary not found with id " + id));

        activitySummary.setMediaAndPropsDepartment(activitySummaryDetails.getMediaAndPropsDepartment());
        activitySummary.setLocationDepartment(activitySummaryDetails.getLocationDepartment());
        activitySummary.setCons(activitySummaryDetails.getCons());
        activitySummary.setProblemsFaced(activitySummaryDetails.getProblemsFaced());
        activitySummary.setSolutionsToProblems(activitySummaryDetails.getSolutionsToProblems());
        activitySummary.setActivity(activitySummaryDetails.getActivity());

        return activitySummaryRepository.save(activitySummary);
    }

    // Delete an activity summary
    public void deleteActivitySummary(Long id) {
        ActivitySummary activitySummary = activitySummaryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity Summary not found with id " + id));
        activitySummaryRepository.delete(activitySummary);
    }

    public Optional<ActivitySummary> getActivitySummariesByActivityId(Long activityId) {
        return activitySummaryRepository.findByActivityId(activityId);
    }
}
