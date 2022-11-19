import { Inject, Injectable } from '@angular/core';
import {
  AngularFireList,
  AngularFireDatabase,
} from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { FIREBASE_API_URL } from '@shared/tokens';

@Injectable()
export abstract class FirebaseAbstract<T extends { id?: string | null }> {
  protected refDb: AngularFireList<T>;

  constructor(
    private db: AngularFireDatabase,
    @Inject(FIREBASE_API_URL) protected firebaseApiUrl: string
  ) {
    this.refDb = db.list(this.firebaseApiUrl);
  }

  getAll(): Observable<T[]> {
    return this.refDb
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ ...c.payload.val(), id: c.payload.key }))
        )
      ) as Observable<T[]>;
  }

  create(data: T): any {
    return this.refDb.push(data);
  }

  update(id: string, value: T): Promise<void> {
    return this.refDb.update(id, value);
  }

  delete(id: string): Promise<void> {
    return this.refDb.remove(id);
  }
}
