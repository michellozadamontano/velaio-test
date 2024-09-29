import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'api/users';

  constructor(private http: HttpClient) { }

  /**
   * Returns an observable of a list of all users
   * @returns {Observable<IUser[]>}
   */
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }

  /**
   * Creates a new user with the given properties
   * @param user The user properties to create
   * @returns The newly created user
   */
  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, user);
  }

  /**
   * Deletes the user with the given id
   * @param id The id of the user to delete
   * @returns An observable of the delete response
   */
  deleteUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
