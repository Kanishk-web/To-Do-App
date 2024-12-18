import { ApiService } from './../../service/api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../model/task';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask() {
    this.ApiService.getAllTask().subscribe(
      (res) => {
        this.taskArr = res;
      },
      (err) => {
        alert('Unable to get list of tasks');
      }
    );
  }

  addTask() {
    if (this.addTaskValue.trim() === '') {
      return;
    }

    this.taskObj.task = this.addTaskValue;
    this.ApiService.addTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      (err) => {
        alert(err);
      }
    );
  }

  updateTask() {
    this.taskObj.task = this.editTaskValue;
    this.ApiService.updateTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Failed to update task');
      }
    );
  }

  deleteTask(etask: Task) {
    this.ApiService.deleteTask(etask).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Failed to delete task');
      }
    );
  }

  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task;
  }
}
