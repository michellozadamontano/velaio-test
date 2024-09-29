import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule, TaskFormComponent]
    });
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with initial controls', () => {
    expect(component.taskForm).toBeDefined();
    expect(component.taskForm.contains('title')).toBeTruthy();
    expect(component.taskForm.contains('deadline')).toBeTruthy();
    expect(component.taskForm.contains('status')).toBeTruthy();
    expect(component.taskForm.contains('users')).toBeTruthy();
  });

  it('should mark form as invalid if required fields are missing', () => {
    component.taskForm.setValue({
      title: '',
      deadline: '',
      status: 'PENDING',
      users: []
    });

    expect(component.taskForm.invalid).toBeTrue();
  });

  it('should add a new user to the form array', () => {
    component.addUser();
    expect(component.users.length).toBe(1);
    expect(component.users.at(0).get('fullName')).toBeTruthy();
    expect(component.users.at(0).get('age')).toBeTruthy();
    expect(component.users.at(0).get('skills')).toBeTruthy();
  });

  it('should remove a user from the form array', () => {
    component.addUser();
    component.addUser();
    expect(component.users.length).toBe(2);

    component.removeUser(0);
    expect(component.users.length).toBe(1);
  });

  it('should add a skill to a user', () => {
    component.addUser();
    const userIndex = 0;
    component.addSkill(userIndex);

    const skills = component.getSkills(userIndex);
    expect(skills.length).toBe(1);
  });

  it('should remove a skill from a user', () => {
    component.addUser();
    const userIndex = 0;
    component.addSkill(userIndex);
    component.addSkill(userIndex);

    expect(component.getSkills(userIndex).length).toBe(2);

    component.removeSkill(userIndex, 0);
    expect(component.getSkills(userIndex).length).toBe(1);
  });

  it('should not allow duplicate full names', () => {
    component.addUser();
    component.addUser();

    component.users.at(0).get('fullName')?.setValue('John Doe');
    component.users.at(1).get('fullName')?.setValue('John Doe');

    expect(component.taskForm.valid).toBeFalse();
    expect(component.users.errors?.['nonUniqueNames']).toBeTruthy();
  });

  it('should emit the onSaveTask event when form is submitted', () => {
    spyOn(component.onSaveTask, 'emit');

    component.taskForm.setValue({
      title: 'Test Task',
      deadline: '2024-12-31',
      status: 'PENDING',
      users: []
    });

    component.onSubmit();
    expect(component.onSaveTask.emit).toHaveBeenCalledWith(component.taskForm.value);
  });

  it('should emit the onCancelTask event when cancelled', () => {
    spyOn(component.onCancelTask, 'emit');

    component.onCancel();
    expect(component.onCancelTask.emit).toHaveBeenCalled();
  });
});
