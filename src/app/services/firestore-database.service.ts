import { Injectable } from '@angular/core';
import { deleteDoc, doc, DocumentData, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDatabaseService {

  // Set Data
  setData(base_url: string, id: string, data: {}) {
    setDoc(doc(this.database, `${base_url}/${id}`), data)
      .catch(
        (error) => {
          console.log(error);
        }
      )
  }

  // Get Data
  async getData(base_url: string, id: string): Promise<DocumentData | undefined> {
    return (await (getDoc(doc(this.database, `${base_url}/${id}`)))).data()
  }


  // Update Data	
  updateData(base_url: string, id: string, data: {}) {
    updateDoc(doc(this.database, `${base_url}/${id}`), data)
      .catch(
        (error) => {
          console.log(error);
        }
      )
  }

  // Delete Data
  deleteData(base_url: string, id: string) {
    deleteDoc(doc(this.database, `${base_url}/${id}`))
      .catch(
        (error) => {
          console.log(error);
        }
      )
  }

  constructor(private database: Firestore) { }

}
