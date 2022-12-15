import { Injectable } from '@angular/core';
import sanityClient from '@sanity/client';
import { from } from 'rxjs';
import { Todo } from './todo-list/todo.interface';
@Injectable({
  providedIn: 'root',
})
export class SanityService {
  sanityClientCredentials = {
    option: sanityClient({
      projectId: 'wvinebza',
      dataset: 'production',
      token:
        'skRPAoX45iC6uHYtRylEpLXT3he6JV74htqDYC4TevzxFCbBD2NxeJHUVwKTZAYb5skrsjHD8odgRIxYhIJAeiObnpxQ9vpFtE3NwS9gIL72q3PkfsQdsGJiwx8TruPzgzI9CraUUUoKwZhMIgIKkg6AFcwjpLnfTZeJ5Atev8HT9a3wdayG',
    }),
  };
  constructor() {}

  getAll() {
    const req = this.sanityClientCredentials.option.fetch(`
      *[_type == "todo"]{
          _id,
      text,
      category,
      date,
    }
  `);
    return from(req);
  }

  create(data: Todo) {
    const req = this.sanityClientCredentials.option.create({
      _type: 'todo',
      text: data.text,
      date: new Date(),
      category: data.category,
    });

    return from(req);
  }

  update(data: Todo) {
    return from(
      this.sanityClientCredentials.option.createOrReplace({
        _id: data._id,
        _type: 'todo',
        text: data.text,
        date: data.date,
        category: data.category,
      })
    );
  }

  delete(id: string) {
    return from(this.sanityClientCredentials.option.delete(id));
  }
}
