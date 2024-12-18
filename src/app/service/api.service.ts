import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://675ff0751f7ad2426999ff32.mockapi.io/todo';

  constructor(private http: HttpClient) {}

  // Create (Add Task)

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  // Read (Get All Tasks)
  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  // Update (Update Task)

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.baseUrl + '/' + task.id, task);
  }

  // Delete (Delete Task)

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(this.baseUrl + '/' + task.id);
  }
}
