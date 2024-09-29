import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input() title!: string;
  @Output() onSaveTask: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancelTask: EventEmitter<any> = new EventEmitter<any>();

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * Creates the form for the task with the following controls:
   *   - title: The title of the task
   *   - deadline: The deadline for the task
   *   - status: The status of the task (PENDING or COMPLETED)
   *   - users: A FormArray of users where each user has a fullName, age and skills
   */
  createForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required], // The title of the task
      deadline: ['', Validators.required], // The deadline for the task
      status: ['PENDING'], // The status of the task (PENDING or COMPLETED)
      users: this.fb.array([], [this.uniqueNamesValidator]) // A FormArray of users and custom validator for unique names
    });
  }

  // Get the users FormArray
  get users(): FormArray {
    return this.taskForm.get('users') as FormArray;
  }

  /**
   * Add a user to the users FormArray
   *
   * Creates a new form group for the user and adds it to the users FormArray.
   * The form group has the following controls:
   *   - fullName: The full name of the user
   *   - age: The age of the user
   *   - skills: A FormArray of skills for the user
   */
  addUser(): void {
    const userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]], // The full name of the user
      age: ['', [Validators.required, Validators.min(18)]], // The age of the user
      skills: this.fb.array([], [ // Form array for skills
        Validators.required, // The skills array is required
        this.minArrayLengthValidator(1) // The skills array must have at least 1 skill
      ])
    });

    this.users.push(userForm);
  }

  // Remove a user from the users FormArray
  removeUser(index: number): void {
    this.users.removeAt(index);
  }

  // Get skills FormArray for a specific user
  getSkills(userIndex: number): FormArray {
    return this.users.at(userIndex).get('skills') as FormArray;
  }

  /**
   * Adds a new skill to the user's skills FormArray
   * @param userIndex The index of the user in the users FormArray
   */
  addSkill(userIndex: number): void {
    const skillsArray = this.getSkills(userIndex);
    /**
     * Create a new skill form group with a single required field 'name'
     */
    const skillForm = this.fb.group({
      name: ['', Validators.required]
    });
    /**
     * Add the new skill form group to the skills FormArray
     */
    skillsArray.push(skillForm);
  }

  /**
   * Removes a skill from the user's skills FormArray
   * @param userIndex The index of the user in the users FormArray
   * @param skillIndex The index of the skill to be removed in the skills FormArray
   */
  removeSkill(userIndex: number, skillIndex: number): void {
    const skillsArray = this.getSkills(userIndex);
    // Remove the skill at the specified index
    skillsArray.removeAt(skillIndex);
  }

  /**
   * Validator to ensure that no two users have the same full name
   * @param control The FormArray of users
   */
  uniqueNamesValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const users = (control as FormArray).controls;
    const fullNames = users.map(userControl => userControl.get('fullName')?.value.toLowerCase().trim());

    const hasDuplicates = fullNames.some((name, index) => fullNames.indexOf(name) !== index);

    // If there are any duplicate names, return the nonUniqueNames error
    return hasDuplicates ? { 'nonUniqueNames': true } : null;
  }

  /**
   * Custom validator to ensure an array has a minimum length
   * @param minLength The minimum number of elements the array should have
   * @returns A validator function that returns an error if the array length is less than the minimum
   */
  minArrayLengthValidator = (minLength: number): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = control as FormArray;
      // Check if the array has at least the minimum number of elements
      const isValid = formArray.length >= minLength;
      // Return an error if the array length is less than the minimum
      return isValid ? null : { 'minArrayLength': true };
    };
  };

  /**
   * Handles the submission of the form by emitting the
   * taskForm.value as an event
   */
  onSubmit(): void {
    if (this.taskForm.valid) {
      // Emit the task form value as an event
      this.onSaveTask.emit(this.taskForm.value);
    }
    else {
      // Display error or handle invalid form
      // Mark all form fields as touched to display errors
      this.taskForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.onCancelTask.emit();
  }
}
