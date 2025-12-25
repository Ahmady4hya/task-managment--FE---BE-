package com.example.task_management.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeveloperDTO {
    private Long id;
    
    @NotBlank(message = "Developer name is required")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    private String role;
    
    private Long projectId;
    
    private String projectName;
    
    private Integer taskCount;
    
    private LocalDateTime createdAt;
}