import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ListService } from '../services/list.service';
import { Lembrete } from 'src/app/shared/models/Lembrete.model';

@Component({
  selector: 'spa-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent {

  nameControl = new FormControl('');
  dateControl = new FormControl('');
  timeControl = new FormControl('');

  list: Lembrete[];

  constructor(private listService: ListService) {
  }
  save() {
    if (this.nameControl.value !="" && this.dateControl.value != '' && this.timeControl.value != ''){
      
      this.listService.create(this.nameControl.value,(this.dateControl.value.concat("T".concat(this.timeControl.value))));
    
      this.nameControl = new FormControl('');
      this.dateControl = new FormControl('');
      this.timeControl = new FormControl('');
    }
  }  
}
