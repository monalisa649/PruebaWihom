import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoModel } from '../models/todo.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

private url : string

  constructor( private http: HttpClient) {
    this.url = 'https://todolist-6d6ec-default-rtdb.firebaseio.com';
   }

newTodo( todo: TodoModel){
  return this.http.post(`${this.url}/todo.json`, todo)
    .pipe(
      map((resp : any)=> {
        todo.id = resp.name;
        return todo;
      })
    );
}

}


