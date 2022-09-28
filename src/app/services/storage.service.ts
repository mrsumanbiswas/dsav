import { Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytesResumable, deleteObject } from '@angular/fire/storage';
import { FirestoreDatabaseService } from './firestore-database.service';
import { RealtimeDatabaseService } from './realtime-database.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  uploadFile(base_path: string, id: string, fileData: File, db: "realtime" | "firestore") {
    // Upload file 
    const uploadTask = uploadBytesResumable(
      ref(this.storage, `${base_path}/${id}`),
      fileData, { contentType: fileData.type, customMetadata: { name: fileData.name, size: fileData.size.toString(), lastModified: fileData.lastModified.toString() } }
    );

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        // tells about the state of the file upload
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            console.log('storage/unauthorized');
            break;
          case 'storage/canceled':
            // User canceled the upload
            console.log('storage/canceled');
            break;

          // ...
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            console.log('storage/unknown');
            break;
        }
      },
      () => {
        const snapshot = uploadTask.snapshot;
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          const data = {
            vote: 0,
            url: downloadURL,
            size: fileData.size,
            name: fileData.name,
            uid: localStorage.getItem('uid'),
            timestamp: snapshot.metadata.timeCreated
          }
          this.upload_data(base_path, id, data, db);
        });
      }
    )

    return uploadTask;
  }

  deleteFile(base_path: string, id: string, db: "realtime" | "firestore") {
    // Delete the file
    deleteObject(
      ref(
        this.storage,
        `${base_path}/${id}`
      )
    ).then(() => {
      // File deleted successfully
      this.delete_data(base_path, id, db);
      console.log('file deleted successfully')
    }).catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error);
    });
  }


  // uploads data to databse(realtime | firestore) after upload of data to storage
  private upload_data(base_path: string, id: string, data: {}, db: "realtime" | "firestore") {
    switch (db) {
      case "realtime":
        this.realtime.writeData(base_path, id, data);
        break;
      case "firestore":
        this.firestore.setData(base_path, id, data);
        break;
    }
  }

  // deletes data form databse(realtime | firestore) after deletation of data form storage
  private delete_data(base_path: string, id: string, db: "realtime" | "firestore") {
    switch (db) {
      case "realtime":
        this.realtime.deleteData(base_path, id);
        break;
      case "firestore":
        this.firestore.deleteData(base_path, id);
        break;
    }
  }


  constructor(
    private storage: Storage,
    private realtime: RealtimeDatabaseService,
    private firestore: FirestoreDatabaseService
  ) { }
}