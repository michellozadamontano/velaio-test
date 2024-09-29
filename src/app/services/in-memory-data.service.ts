import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { ISkill } from '../models/skill.interface';
import { ITask, Status } from '../models/task.interface';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }
  createDb(): {} | Observable<{}> | Promise<{}> {

    const tasks: ITask[] = [
      {
        id: 1,
        title: 'First Task',
        deadline: new Date(),
        status: Status.PENDING,
        users: [
          {
            id: 1,
            fullName: 'John Doe',
            age: 30,
            skills: [
              { id: 1, name: 'JavaScript' },
              { id: 2, name: 'Angular' }
            ]
          }
        ]
      },
      {
        id: 2,
        title: 'Second Task',
        deadline: new Date(),
        status: Status.COMPLETED,
        users: [
          {
            id: 2,
            fullName: 'Jane Smith',
            age: 25,
            skills: [
              { id: 2, name: 'Angular' },
              { id: 3, name: 'React' }
            ]
          }
        ]
      }
    ];

    const users: IUser[] = [
      { id: 1, fullName: 'John Doe', age: 30, skills: [] },
      { id: 2, fullName: 'Jane Smith', age: 25, skills: [] }
    ];

    const skills: ISkill[] = [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
      { id: 3, name: 'Angular' },
      { id: 4, name: 'React' }
    ];

    return { tasks, users, skills }; // Key is the name of the mock API

  }
}
