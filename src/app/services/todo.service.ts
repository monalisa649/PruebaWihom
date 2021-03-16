import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoModel } from '../models/todo.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://todolist-6d6ec-default-rtdb.firebaseio.com';
  }

  newTodo(todo: TodoModel) {
    return this.http.post(`${this.url}/todo.json`, todo).pipe(
      map((resp: any) => {
        todo.id = resp.name;
        return todo;
      })
    );
  }

  updateTodo(todo: TodoModel) {
    const todoTemp = {
      ...todo,
    };
    delete todoTemp.id;
    todoTemp.fechaActualizacion = new Date();

    return this.http.put(`${this.url}/todo/${todo.id}.json`, todoTemp);
  }

  getTodo(id: string) {
    return this.http.get(`${this.url}/todo/${id}.json`);
  }

  getTodos() {
    return this.http.get(`${this.url}/todo.json`).pipe(map(this.crearArreglo));
  }

  deleteTodo(id: string) {
    return this.http.delete(`${this.url}/todo/${id}.json`);
  }

  private crearArreglo(todoObj: object) {
    const todos: TodoModel[] = [];
    //Si no hay registros en firebase retorna arreglo vacio
    if (todoObj == null) {
      return [];
    }
    //Extraer objeto y crear nueva referencia de todo
    Object.keys(todoObj).forEach((key) => {
      const todo: TodoModel = todoObj[key];
      todo.id = key;
      todos.push(todo);
    });

    return todos;
  }
}
