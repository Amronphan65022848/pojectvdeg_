package com.example.smart.VDEG.controller;

import com.example.smart.VDEG.entity.ActivitySummary;
import com.example.smart.VDEG.service.ActivitySummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/activity-summary")
public class ActivitySummaryController {

    @Autowired
    private ActivitySummaryService activitySummaryService;

    // Create new activity summary
    @PostMapping
    public ResponseEntity<ActivitySummary> createActivitySummary(@RequestBody ActivitySummary activitySummary) {
        ActivitySummary newActivitySummary = activitySummaryService.createActivitySummary(activitySummary);
        return ResponseEntity.ok(newActivitySummary);
    }

    // Get all activity summaries
    @GetMapping
    public ResponseEntity<List<ActivitySummary>> getAllActivitySummaries() {
        List<ActivitySummary> activitySummaries = activitySummaryService.getAllActivitySummaries();
        return ResponseEntity.ok(activitySummaries);
    }

    // Get specific activity summary by ID
    @GetMapping("/{id}")
    public ResponseEntity<ActivitySummary> getActivitySummaryById(@PathVariable("id") Long id) {
        Optional<ActivitySummary> activitySummary = activitySummaryService.getActivitySummaryById(id);
        return activitySummary.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get activity summaries by activity ID
    @GetMapping("/activity/{activityId}")
    public ResponseEntity<Optional<ActivitySummary>> getActivitySummariesByActivityId(@PathVariable("activityId") Long activityId) {
        Optional<ActivitySummary> activitySummaries = activitySummaryService.getActivitySummariesByActivityId(activityId);
        return ResponseEntity.ok(activitySummaries);
    }

    // Update activity summary
    @PutMapping("/{id}")
    public ResponseEntity<ActivitySummary> updateActivitySummary(@PathVariable("id") Long id, @RequestBody ActivitySummary activitySummaryDetails) {
        ActivitySummary updatedActivitySummary = activitySummaryService.updateActivitySummary(id, activitySummaryDetails);
        return ResponseEntity.ok(updatedActivitySummary);
    }

    // Delete activity summary
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivitySummary(@PathVariable("id") Long id) {
        activitySummaryService.deleteActivitySummary(id);
        return ResponseEntity.noContent().build();
    }
}
