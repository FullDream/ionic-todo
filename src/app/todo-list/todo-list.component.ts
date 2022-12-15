import { Component, OnInit } from '@angular/core';
import { CreateOrEditModalComponent } from '@app/create-or-edit-modal/create-or-edit-modal.component';
import { Todo } from '@app/todo-list/todo.interface';
import { AlertController, ModalController } from '@ionic/angular';
import { FirebaseAbstract } from '@shared/abstractions';
import { Observable } from 'rxjs';
import { StrapiService } from '../strapi.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  public items$: Observable<Todo[]>;
  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private firebaseService: FirebaseAbstract<Todo>,
    public directusService: StrapiService
  ) {}

  ngOnInit(): void {
    this.items$ = this.directusService.getAll();
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
            this.directusService.delete(data.id).subscribe();
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
