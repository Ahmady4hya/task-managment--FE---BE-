package com.example.task_management.dto;

import com.example.task_management.constants.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private Long id;
    
    @NotBlank(message = "Task title is required")
    private String title;
    
    private String description;
    
    @NotNull(message = "Task status is required")
    private TaskStatus status;
    
    private LocalDate dueDate;
    
    @NotNull(message = "Project ID is required")
    private Long projectId;
    
    private String projectName;
    
    private Long assignedToId;
    
    private String assignedToName;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}