package com.example.task_management.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDTO {
    private Long id;
    
    @NotBlank(message = "Project name is required")
    private String name;
    
    private String description;
    
    private Integer developerCount;
    
    private Integer taskCount;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}