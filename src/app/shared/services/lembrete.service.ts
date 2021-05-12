import { Injectable } from "@angular/core";

import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

import { Lembrete } from '../models/Lembrete.model';
import { getEntities, setEntities } from '../../../assets/db';

@Injectable({ providedIn: 'root' })
export class LembreteService {

  getList(page: number): Observable<Lembrete[]> {
    const start = page * 5;
    return of(getEntities().slice(start, start + 5))
      .pipe(delay(2000));
  }

  

  create(name : string, date: Date): Observable<Lembrete> {
    const id = getEntities()[0].id + 1;
    const entity: Lembrete = {
      id,
      date : date,
      name : name,
    }
    setEntities([entity, ...getEntities()]);
    return of(entity)
      .pipe(delay(2000));
  }

  remove(id: number): Observable<boolean | never> {
    const length = getEntities().length;
    const filtered = getEntities().filter(item => item.id !== id);
    setEntities(filtered);
    return of('')
      .pipe(
        delay(2000),
        mergeMap(() => filtered.length === length ?
          throwError(`Todo com id: ${ id } não existe.`)
          : of(true),
        ),
      );
  }
}
