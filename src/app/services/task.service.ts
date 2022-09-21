import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { ITask } from '../models/task.interface';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './massage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'https://jsonplaceholder.typicode.com/todos';

  private handleError: HandleError;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };

  constructor(private http: HttpClient,private httpErrorHandler: HttpErrorHandler,private messageService : MessageService) { 
    this.handleError = httpErrorHandler.createHandleError('userService');
  }

  
private log(message: string) {
  this.messageService.add(`UserService: ${message}`);
 }

   /** GET users's tasks from the server */
   getTasks(): Observable<ITask[]> {
    const i = this.http.get<ITask[]>(this.tasksUrl);
    //i.subscribe(val => console.log(val));
    return this.http.get<ITask[]>(this.tasksUrl)
      .pipe(
        tap(_ => this.log('getting tasks')),
        catchError(this.handleError('getTasks', []))
      );
  }
}
