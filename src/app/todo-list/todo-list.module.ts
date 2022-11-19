import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list.component';

import { RouterModule } from '@angular/router';
import { TodoApiService } from '@app/todo-list/todo-api.service';
import { FirebaseAbstract } from '@shared/abstractions';
import { FIREBASE_API_URL } from '@shared/tokens';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TodoListComponent,
      },
    ]),
  ],
  declarations: [TodoListComponent],
  providers: [
    { provide: FIREBASE_API_URL, useValue: 'todos' },
    { provide: FirebaseAbstract, useClass: TodoApiService },
  ],
})
export class TodoListModule {}
