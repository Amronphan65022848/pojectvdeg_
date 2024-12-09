package com.example.smart.VDEG.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.smart.VDEG.entity.Activity;
import com.example.smart.VDEG.service.ActivityService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    // สร้างกิจกรรมใหม่
    @PostMapping
    public ResponseEntity<Activity> createActivity(@RequestBody Activity activity) {
        Activity createdActivity = activityService.createActivity(activity);
        return ResponseEntity.ok(createdActivity);
    }

    @PostMapping("/{activityId}/incrementVolunteer")
    public ResponseEntity<Activity> incrementVolunteer(@PathVariable("activityId") Long activityId) {
        Optional<Activity> updatedActivity = activityService.incrementVolunteerAmount(activityId);

        if (updatedActivity.isPresent()) {
            return ResponseEntity.ok(updatedActivity.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/{activityId}/update-link")
    public ResponseEntity<Activity> updateInformationLink(
            @PathVariable("activityId") Long activityId,
            @RequestBody String informationLink) {

        Optional<Activity> updatedActivity = activityService.updateInformationLink(activityId, informationLink);

        // ตรวจสอบว่ามีการอัปเดตข้อมูลสำเร็จหรือไม่
        if (updatedActivity.isPresent()) {
            return ResponseEntity.ok(updatedActivity.get());  // ส่งข้อมูลกลับถ้าอัปเดตสำเร็จ
        } else {
            return ResponseEntity.notFound().build();  // ส่ง 404 ถ้าไม่พบ Activity
        }
    }

    // ดึงข้อมูลกิจกรรมทั้งหมด
    @GetMapping
    public ResponseEntity<List<Activity>> getAllActivities() {
        List<Activity> activities = activityService.getAllActivities();
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/active")
    public ResponseEntity<List<Map<String, Object>>> getActiveActivities() {
        List<Map<String, Object>> activeActivities = activityService.getActiveActivities();
        return ResponseEntity.ok(activeActivities);
    }

    @GetMapping("/active/detail")
    public ResponseEntity<List<Map<String, Object>>> getActiveDetail() {
        List<Map<String, Object>> activeActivities = activityService.getActiveDetail();
        return ResponseEntity.ok(activeActivities);
    }

    // ดึงข้อมูลกิจกรรมตาม ID
    @GetMapping("/{id}")
    public ResponseEntity<Activity> getActivityById(@PathVariable("id") Long id) {
        Optional<Activity> activity = activityService.getActivityById(id);
        return activity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // อัปเดตข้อมูลกิจกรรม
    @PutMapping("/{id}")
    public ResponseEntity<Activity> updateActivity(@PathVariable("id") Long id, @RequestBody Activity updatedActivity) {
        Activity updated = activityService.updateActivity(id, updatedActivity);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Activity> updateActivityStatus(@PathVariable("id") Long id, @RequestBody boolean status) {
        Optional<Activity> updatedActivity = activityService.updateActivityStatus(id, status);
        return updatedActivity.map(activity -> ResponseEntity.ok(activity))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ลบกิจกรรมตาม ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable("id") Long id) {
        activityService.deleteActivity(id);
        return ResponseEntity.noContent().build();
    }
}
