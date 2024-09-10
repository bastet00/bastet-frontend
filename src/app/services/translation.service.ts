import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { EgyptianWord, TranslationRes } from '../landing/interface';
import { toSymbol } from '../landing/utils';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private url = 'https://bastet-server-ef94bb4e91eb.herokuapp.com/search';
  private dataSubject = new BehaviorSubject<TranslationRes[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  data$ = this.dataSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  constructor() {}

  translation(from: string, word: string): Observable<TranslationRes[]> {
    const controller = new AbortController();
    const signal = controller.signal;
    this.loadingSubject.next(true);
    return fromFetch(`${this.url}?lang=${from}&word=${word}`, {
      signal,
      headers: {
        'Content-Type': 'application/json',
      },
    }).pipe(
      switchMap((response): Promise<TranslationRes[]> => {
        this.loadingSubject.next(true);

        if (response.ok) {
          this.loadingSubject.next(false);
          return response.json();
        } else {
          this.loadingSubject.next(false);
          throw new Error('Failed to fetch translation');
        }
      }),

      tap((translation: TranslationRes[]) => {
        translation.forEach((obj: TranslationRes) => {
          obj.Egyptian.forEach(
            (obj: EgyptianWord) => (obj.Symbol = toSymbol(obj.Symbol)),
          );
        });

        this.dataSubject.next(translation);
      }),

      catchError((err) => {
        console.error('Error during translation:', err);
        return of([]);
      }),
    );
  }
  setNull() {
    this.dataSubject.next([]);
  }
}
