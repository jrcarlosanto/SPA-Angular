import { Component, OnInit } from '@angular/core';

import { Lembrete } from '../../../shared/models/Lembrete.model';
import { ListService } from '../services/list.service';

@Component({
  selector: 'spa-last-todos',
  templateUrl: './last-todos.component.html',
  styleUrls: ['./last-todos.component.scss']
})
export class LastTodosComponent implements OnInit {

  list: Lembrete[];
  pagList = 0;
  
  constructor(private listService: ListService,
    ) {
  }

  ngOnInit() {
    this.listService.getList(0);

    this.listService.list$
      .subscribe(list => this.list = list);
  }

  
  loadMore() {
    this.listService.page++;
    this.pagList++;
    
    this.listService.getList(this.listService.page);

    if(this.list.length ===0){
      this.loadLess();
    }
  }
  loadLess(){
    this.listService.page--;
    this.pagList--;
    
    if(this.listService.page<0){
      this.listService.page = 0;
      this.pagList = 0 ;
    }
    this.listService.getList(this.listService.page);
  }

  onDelete(id: number) {
    this.listService.remove(id);
    this.listService.getList(this.listService.page);
  }
}
