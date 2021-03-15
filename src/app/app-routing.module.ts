import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './pages/todo/todo.component';
import { TodosComponent } from './pages/todos/todos.component';


const routes: Routes = [

  {path:'todos', component: TodosComponent},
  {path: 'todo/:id', component: TodoComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'todos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
