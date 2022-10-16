import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/models/task.interface';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  public tasks :ITask[] = [];

  public selectedUser:number;

  constructor(private taskService:TaskService) { }

  
  ngOnInit(): void {
    this.getAllTasks()
  }

  getAllTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => (this.tasks = tasks));
  }

  getSelectedUser():void {
    this.taskService.getSelectedUser().subscribe(userid => (this.selectedUser = userid));
  }

}
