import { Component, OnInit, signal, resource, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../../core/services/project.service';
import { Project } from '../../models/project.model';
import { SpinnerComponent } from '../../../../shared/ui-components/spinner/spinner';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { firstValueFrom, of } from 'rxjs';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './project-form.html',
  styleUrl: './project-form.scss',
})
export class ProjectFormComponent {
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  projectForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
  });

  projectId = toSignal(
    this.route.paramMap.pipe(
      map(pm => {
        const raw = pm.get('id');
        return raw && raw !== 'new' ? Number(raw) : null;
      })
    ),
    { initialValue: null }
  );

  isEditMode = signal(false);
  error = signal<string | null>(null);
  submitting = signal(false);

  projectRes = resource({
    loader: () => {
      const id = this.projectId();
      if (id == null) return Promise.resolve(null)
      return firstValueFrom(this.projectService.getProjectById(id));
    }
  });

  constructor(){
    effect(() => {
      this.isEditMode.set(this.projectId() != null);
    });

    effect(() => {
      const project = this.projectRes.value();
      if (!project) return;

      this.projectForm.patchValue({
        name: project.name,
        description: project.description ?? '',
      });
    });

    effect(() => {
      if (this.projectRes.error()) {
        this.error.set('Failed to load project. Please try again.');
      }
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    const projectData: Project = {
      name: this.projectForm.value.name,
      description: this.projectForm.value.description || undefined,
    };

    const id = this.projectId();
    const operation$ =
      id != null
        ? this.projectService.updateProject(id, projectData)
        : this.projectService.createProject(projectData);

    operation$.subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/projects']);
      },
      error: () => {
        this.submitting.set(false);
        this.error.set(
          id != null
            ? 'Failed to update project. Please try again.'
            : 'Failed to create project. Please try again.'
        );
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/projects']);
  }

  get pageTitle(): string {
    return this.isEditMode() ? 'Edit Project' : 'Create New Project';
  }

  get submitButtonText(): string {
    return this.submitting()
      ? (this.isEditMode() ? 'Updating...' : 'Creating...')
      : (this.isEditMode() ? 'Update Project' : 'Create Project');
  }
}
