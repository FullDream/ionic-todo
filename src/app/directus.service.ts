import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '@app/todo-list/todo.interface';
import { tap, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DirectusService {
  URL = 'https://abrbohea.directus.app/items/todos';

  constructor(private readonly httpClient: HttpClient) {}

  getAll() {
    return this.httpClient
      .get<{ data: Todo[] }>(this.URL)
      .pipe(map((res) => res.data));
  }

  create({ text, category }: Todo) {
    return this.httpClient.post(this.URL, { text, category });
  }

  update({ text, category, id }: Todo) {
    return this.httpClient.patch(this.URL + '/' + id, { text, category });
  }

  delete(id: any) {
    return this.httpClient.delete(this.URL + '/' + id);
  }
}
