import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../features/projects/models/project.model';

@Component({
  selector: 'app-project-card',
  imports: [CommonModule],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  standalone: true
})
export class ProjectCard {
  @Input() project!: Project;
  @Output() viewDetails = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onViewDetails(): void {
    if (this.project.id) {
      this.viewDetails.emit(this.project.id);
    }
  }

  onEdit(): void {
    if (this.project.id) {
      this.edit.emit(this.project.id);
    }
  }

  onDelete(): void {
    if (this.project.id) {
      this.delete.emit(this.project.id);
    }
  }
}
