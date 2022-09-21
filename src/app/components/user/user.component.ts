
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.interface';
import { HttpErrorHandler } from 'src/app/services/http-error-handler.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss',],
})
export class UserComponent implements OnInit {

  public users :IUser[] = [];

  constructor(private userService:UserService) { }

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
      .deleteHero(user.id)
      .subscribe();
    this.userService.deleteHero(user.id);
   
  }

}
