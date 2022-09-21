import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap,throwError  } from 'rxjs';
import { IUser } from '../models/user.interface';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './massage.service';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  private users:IUser[] = []

  private usersUrl = 'https://jsonplaceholder.typicode.com/users';

  private handleError: HandleError;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };
  
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
   }

  constructor(private http: HttpClient,private httpErrorHandler: HttpErrorHandler,private messageService : MessageService) { 
    this.handleError = httpErrorHandler.createHandleError('userService');
  }


  /** GET users from the server */
  getUsers(): Observable<IUser[]> {
    const i = this.http.get<IUser[]>(this.usersUrl);
    //i.subscribe(val => console.log(val));
    return this.http.get<IUser[]>(this.usersUrl)
      .pipe(
        tap(_ => this.log('getting users')),
        catchError(this.handleError('getUsers', []))
      );
  }

  /** DELETE: delete the user from the server */
  deleteHero(id: number): Observable<unknown> {
    const url = `${this.usersUrl}/${id}`; 
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError('deleteUser'))
      );
  }
}
