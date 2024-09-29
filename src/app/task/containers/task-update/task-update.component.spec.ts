import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskUpdateComponent } from './task-update.component';

describe('TaskUpdateComponent', () => {
  let component: TaskUpdateComponent;
  let fixture: ComponentFixture<TaskUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskUpdateComponent]
    });
    fixture = TestBed.createComponent(TaskUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
