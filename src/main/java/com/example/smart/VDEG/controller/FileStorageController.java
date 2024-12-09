package com.example.smart.VDEG.controller;

import java.io.IOException; // Correct import for IOException
import java.util.Map; // Correct import for Map
import java.util.List;
import java.util.HashMap;
import java.util.ArrayList;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.smart.VDEG.service.FileStorageService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class FileStorageController {
    
    private final FileStorageService fileStorageService = new FileStorageService();
    @PostMapping("/upload")
    public ResponseEntity<Map<String, List<String>>> uploadFiles(@RequestParam("files") MultipartFile[] files) {
        List<String> fileUrls = new ArrayList<>();
        Map<String, List<String>> response = new HashMap<>();
        
        try {
            for (MultipartFile file : files) {
                String fileUrl = fileStorageService.storeFile(file);
                fileUrls.add(fileUrl);
            }
            response.put("fileUrls", fileUrls);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(Map.of("error", List.of("Failed to upload files: " + e.getMessage())));
        }
    }
}
