import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { TodoModel } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

import Swal from 'sweetalert2';

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

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false

    })

    Swal.showLoading();

    let peticion: Observable<any>;



    if ( this.todo.id){
      peticion = this.todoService.updateTodo(this.todo);




    } else{

      peticion = this.todoService.newTodo(this.todo);



    }

    peticion.subscribe(res=> {
      Swal.fire({
        title: this.todo.nombre,
        text: 'Se actualizó correctamentte',
        icon: 'success'

      });
    })



  }
}
