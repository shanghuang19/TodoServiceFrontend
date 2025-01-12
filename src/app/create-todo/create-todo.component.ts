import { Component, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TodoHttpService } from '../service/todo-http.service';
import { Output } from '@angular/core';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent {
  @Output() created = new EventEmitter()
  constructor(
    private formBuilder: FormBuilder,
    private todoHttpService: TodoHttpService
    ){}
    
  todoForm = this.formBuilder.group(
    {
      title: '',
      description: ''
    }
  )



  onSubmit()
  {
    const formValues = this.todoForm.value
    if (formValues.title && formValues.description)
    {
      //this.todoService.create(formValues.title,formValues.description)
      this.todoHttpService.create(formValues.title, 
        formValues.description).subscribe(()=>{
          this.todoForm.reset()
          this.created.emit()})
      
    }
    //this.todoForm.reset()
  }
}
