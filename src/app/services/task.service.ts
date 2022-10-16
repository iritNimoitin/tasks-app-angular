import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap ,of} from 'rxjs';
import { ITask } from '../models/task.interface';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './massage.service';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'https://jsonplaceholder.typicode.com/todos';

  public selectedUser:number;

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

    
  getUserTasksByUserId(userId: number): Observable<unknown> {
    const url = `${this.tasksUrl}/${userId}`;
    return this.http.get(url, this.httpOptions)
      .pipe(
        catchError(this.handleError('deleteHero'))
      );
  }

  setSelectedUser(userid: number):void{
    this.selectedUser = userid;
    console.log(userid);
  }

  getSelectedUser():Observable<number>{
    return of(this.selectedUser);
  }
}
