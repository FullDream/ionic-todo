import { Injectable } from '@angular/core';
import { FirebaseAbstract } from '@shared/abstractions';
import { Todo } from './todo.interface';

@Injectable()
export class TodoApiService extends FirebaseAbstract<Todo> {}
