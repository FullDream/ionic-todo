import { Component, OnInit } from '@angular/core';
import { CreateOrEditModalComponent } from '@app/create-or-edit-modal/create-or-edit-modal.component';
import { Todo } from '@app/todo-list/todo.interface';
import { AlertController, ModalController } from '@ionic/angular';
import { FirebaseAbstract } from '@shared/abstractions';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID) {
    deleteTodo(where: { id: $id }) {
      id
    }
  }
`;
@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  public items: Todo[];
  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: gql`
          {
            todos {
              text
              id
              category
              date
            }
          }
        `,
      })
      .valueChanges.subscribe(({ data }) => (this.items = data?.todos));
  }

  public async onDelete(event: Event, data: Todo): Promise<void> {
    event.stopPropagation();
    const alert = await this.alertController.create({
      header: 'Deleting',
      message: `Do you really want to remove "${data.text}" ?`,

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'confirm',
          handler: () => {
            this.apollo
              .mutate({ mutation: DELETE_TODO, variables: { id: data.id } })
              .subscribe(console.log);
          },
        },
      ],
    });

    await alert.present();
  }

  public async openModal(todo?: Todo): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: CreateOrEditModalComponent,
      componentProps: { values: todo },
    });
    modal.present();
  }
}
