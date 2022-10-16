
import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/models/task.interface';
import { IUser } from 'src/app/models/user.interface';
import { HttpErrorHandler } from 'src/app/services/http-error-handler.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss',],
})
export class UserComponent implements OnInit {

  public users :IUser[] = [];

  public tasks:ITask[] = [];

  public selectedUserId:number;

  public editUser: IUser | undefined;
 
  public isOtherData:boolean = false;

  constructor(private userService:UserService,private tasksService: TaskService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(): void {
    this.userService.getUsers()
      .subscribe(users => (this.users = users));
  }

  
  delete(user: IUser): void {
    this.users = this.users.filter(u => u !== user);
    this.userService
      .deleteUser(user.id)
      .subscribe();
    this.userService.deleteUser(user.id);
   
  }
 
  public setSelectedUser(userid: number):void {
    this.selectedUserId = userid;
    this.tasksService.setSelectedUser(userid);
  }
}
