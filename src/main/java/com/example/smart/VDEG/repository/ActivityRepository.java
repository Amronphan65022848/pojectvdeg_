package com.example.smart.VDEG.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.smart.VDEG.entity.Activity;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    @Query("SELECT a.activityId AS activityId, a.activityImageUrl AS activityImageUrl,a.startDate AS startDate , a.endDate AS endDate FROM Activity a WHERE a.status = true")
    List<Map<String, Object>> findActiveActivities();

    @Query("SELECT a.activityId AS activityId,activityName As activityName, a.activityImageUrl AS activityImageUrl,a.activityDescription AS activityDescriptions FROM Activity a WHERE a.status = true")
    List<Map<String, Object>> findActiveDetail();
}
