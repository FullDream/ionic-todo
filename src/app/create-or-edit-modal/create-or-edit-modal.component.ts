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

@Component({
  selector: 'app-create-or-edit-modal',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-or-edit-modal.component.html',
})
export class CreateOrEditModalComponent implements OnInit {
  @Input() values: Record<string, any>;

  public form = new FormGroup({
    id: new FormControl(''),
    date: new FormControl(''),
    text: new FormControl('', { validators: Validators.required }),
    category: new FormControl('', { validators: Validators.required }),
  });

  constructor(
    private modalCtrl: ModalController,
    private firebaseService: FirebaseAbstract<Todo>
  ) {}

  ngOnInit() {
    this.form.patchValue(this.values);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  public async onSubmit() {
    const formValues = {
      ...this.form.value,
    } as Todo;

    !this.values
      ? this.firebaseService.create(formValues)
      : this.firebaseService.update(formValues.id as string, formValues);
    return this.modalCtrl.dismiss(formValues, 'confirm');
  }
}
