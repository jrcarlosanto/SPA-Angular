import { Injectable } from "@angular/core";
import { Data } from "@angular/router";

import { BehaviorSubject, Observable } from 'rxjs';

import { Lembrete } from 'src/app/shared/models/Lembrete.model';
import { LembreteService } from 'src/app/shared/services/lembrete.service';

@Injectable()
export class ListService {

  page = 0;
  private listSubject = new BehaviorSubject<Lembrete[]>([]);

  constructor(private lembreteService: LembreteService) {
  }

  get list$(): Observable<Lembrete[]> {
    return this.listSubject.asObservable();
  }

  set list(value: Lembrete[]) {
    this.listSubject.next(value);
  }

  create(name: string, date: Date) {
    this.lembreteService.create( name ,date)
      .subscribe(lembrete => this.list = [lembrete, ...this.listSubject.value]);
  }

  getList(page: number) {
    this.lembreteService.getList(page)
      .subscribe(list => {
          this.list = list;
      });
  }

  remove(id: number) {
    this.lembreteService.remove(id)
      .subscribe(() =>
        this.list = this.listSubject.value.filter(item => item.id !== id),
      );  
  }
}
