package com.example.smart.VDEG.repository;

import com.example.smart.VDEG.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {

    // ใช้ Native Query เพื่อดึงข้อมูลเฉพาะฟิลด์ที่ต้องการ
    @Query(value = "SELECT d.id, d.time, d.full_name AS fullName, d.contact, d.amount " +
                   "FROM donation d WHERE d.activity_id = :activityId", nativeQuery = true)
    List<Map<String, Object>> findDonationsByActivityId(@Param("activityId") Long activityId);
}

