import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TodoModel } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
todo = new TodoModel();
  constructor( private todoService : TodoService) { }

  ngOnInit(): void {
  }

  guardar( form : NgForm){
    if(form.invalid){
      console.log('formulario no valido');
      return;
    }

    this.todoService.newTodo(this.todo)
        .subscribe( (res: TodoModel)=>{
          console.log(res);
        });

  }
}
