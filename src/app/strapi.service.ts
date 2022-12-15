import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '@app/todo-list/todo.interface';
import { tap, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StrapiService {
  URL = 'api/todos';

  constructor(private readonly httpClient: HttpClient) {}

  getAll() {
    return this.httpClient
      .get<{ data: Todo[] }>(this.URL)
      .pipe(map((res) => res.data));
  }

  create({ text, category, date }: Todo) {
    return this.httpClient.post(this.URL, { data: { text, category, date } });
  }

  update({ text, category, id, date }: Todo) {
    return this.httpClient.patch(this.URL + '/' + id, {
      data: { text, category, date },
    });
  }

  delete(id: any) {
    return this.httpClient.delete(this.URL + '/' + id);
  }
}
