import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor( private todoService : TodoService,
               private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {
    //Obtener id que viene como parametro en la ruta
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo'){
      this.todoService.getTodo(id)
      .subscribe((resp: TodoModel) =>{
        this.todo = resp;
        this.todo.id=id;

      })
    }
  }

  guardar( form : NgForm){
    if(form.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Formulario no es valido, llene los campos',
        })

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
      this.router.navigateByUrl('/todos');
    })



  }
}
