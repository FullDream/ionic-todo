import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Todo } from '@app/todo-list/todo.interface';
import { IonicModule, ModalController } from '@ionic/angular';
import { FirebaseAbstract } from '@shared/abstractions';
import { Apollo, gql } from 'apollo-angular';

const CREATE_TODO = gql`
  mutation CreateTodo($data: TodoCreateInput!) {
    createTodo(data: $data) {
      id
      text
      date
      category
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID, $data: TodoUpdateInput!) {
    updateTodo(where: { id: $id }, data: $data) {
      id
      text
      date
      category
    }
  }
`;

@Component({
  selector: 'app-create-or-edit-modal',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-or-edit-modal.component.html',
})
export class CreateOrEditModalComponent implements OnInit {
  @Input() values: Record<string, any>;

  public form = new FormGroup({
    id: new FormControl(null),
    date: new FormControl(null),
    text: new FormControl('', { validators: Validators.required }),
    category: new FormControl('', { validators: Validators.required }),
  });

  constructor(private modalCtrl: ModalController, private apollo: Apollo) {}

  ngOnInit() {
    this.form.patchValue(this.values);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  public async onSubmit() {
    const { id, ...formValues } = Object.fromEntries(
      Object.entries(this.form.value).filter(([_, v]) => v != null)
    ) as any;

    !this.values
      ? this.apollo
          .mutate({
            mutation: CREATE_TODO,
            variables: { data: formValues },
          })
          .subscribe((data) => console.log('create', data))
      : this.apollo
          .mutate({
            mutation: UPDATE_TODO,
            variables: { id, data: formValues },
          })
          .subscribe((data) => console.log('create', data));
    return this.modalCtrl.dismiss(formValues, 'confirm');
  }
}
