import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-upload-photos',
  templateUrl: './upload-photos.component.html',
  styleUrls: ['./upload-photos.component.scss']
})
export class UploadPhotosComponent implements OnInit {
  uploadfraction!: number;
  previewPhoto!: string | ArrayBuffer | null;
  fileData!: File;

  constructor(private storage: StorageService) { }

  ngOnInit(): void { }



  preview() {
    let reader = new FileReader();

    reader.readAsDataURL(this.fileData);

    reader.onload = () => {
      this.previewPhoto = reader.result;
    };

    reader.onerror = () => {
      console.log(reader.error);
    };
  }

  photoSelected(files: FileList | null) {
    const file = files?.item(0)
    if (file !== null && file !== undefined) {
      this.fileData = file
      this.preview()
      return true
    } else {
      return false
    }
  }

  // uploads photo to storage and creates a data to the realtime database
  uploadPhoto() {
    if (
      sessionStorage.getItem('isLogedIn') === 'true'
    ) {
      this.storage.uploadFile('photos', Date.now().toString(), this.fileData, 'realtime')
        .on('state_changed',
          (snapshot) => {
            this.uploadfraction = (snapshot.bytesTransferred / snapshot.totalBytes);
          }
        )
    } else {
      alert(
        'Please sign-in to upload a photo'
      );

    }
  }

}
