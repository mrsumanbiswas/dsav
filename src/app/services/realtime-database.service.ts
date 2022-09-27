import { Injectable } from '@angular/core';
import {
  ref,
  set,
  get,
  push,
  child,
  remove,
  update,
  Database,
  DataSnapshot
} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RealtimeDatabaseService {

  writeData(base_url: string, id: string, value: any) {
    set(child(ref(this.database), `${base_url}/${id}`), value)
      .catch((error) => {
        console.log(error);
      })
  }

  readData(base_url: string, id: string): Promise<DataSnapshot> {
    return get(ref(this.database, `${base_url}/${id}`))
  }

  // updateData(base_url: string, id: string, value: any) {
  //   update(ref(this.database, `${base_url}/${id}`), value)
  //     .catch(
  //       (error) => {
  //         console.log(error);
  //       }
  //     )
  // }  amake pore korte hobe // I'm havig issues

  deleteData(base_url: string, id: string) {
    remove(ref(this.database, `${base_url}/${id}`))
      .catch(
        (error) => {
          console.log(error);
        }
      )
  }


  constructor(private database: Database) { }
}
