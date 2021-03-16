import { Component, OnInit } from '@angular/core';
import { TodoModel } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
 todos : TodoModel[]=[];
 cargando = false;

  constructor(private todoService : TodoService) { }

  ngOnInit(): void {
    this.cargando = true;

    this.listTodos();

  }

  listTodos(){
  this.todoService.getTodos()
  .subscribe(resp => {
    this.todos = resp;
    this.cargando = false;

  });




  }

  deleteTodo(todo: TodoModel, i:number){

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ todo.nombre }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.todos.splice(i, 1);
        this.todoService.deleteTodo( todo.id ).subscribe();
      }

    });


  }


}
