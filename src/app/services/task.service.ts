import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ITask } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'api/tasks'; // URL to web API

  constructor(private http: HttpClient) { }

  /**
   * Returns an observable of a list of all tasks
   * @returns {Observable<ITask[]>}
   */
  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.apiUrl);
  }

  getTasksByStatus(status: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.apiUrl}/status/${status}`).pipe(
      tap((result) => console.log(result))

    );
  }

  /**
   * Creates a new task with the given properties
   * @param task The task properties to create
   * @returns The newly created task
   */
  createTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.apiUrl, task);
  }

  /**
   * Updates the task with the given id and properties
   * @param task The updated task properties
   * @returns An observable of the update response
   */
  updateTask(task: ITask): Observable<any> {
    return this.http.put(this.apiUrl, task);
  }

  /**
   * Deletes the task with the given id
   * @param id The id of the task to delete
   * @returns An observable of the delete response
   */
  deleteTask(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
