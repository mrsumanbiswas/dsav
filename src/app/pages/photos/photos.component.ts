import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadPhotosComponent } from 'src/app/components/upload-photos/upload-photos.component';
import { FirestoreDatabaseService } from 'src/app/services/firestore-database.service';
import { onValue, Database, ref } from '@angular/fire/database';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  postData: {
    uid: string;
    url: string;
    size: number;
    vote: number;
    name: string;
    timestamp: string;
    displayName: string;
    photoURL: string;
  }[] = [];

  constructor(
    private database: Database,
    private firestore: FirestoreDatabaseService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  // scrolls to TOP
  top() {
    window.scrollTo(0, 0)
  }

  // opens photo upload 
  openDialog(): void {
    this.dialog.open(UploadPhotosComponent, {
      minWidth: '250px',
      maxWidth: '400px',
      enterAnimationDuration: '800ms',
      exitAnimationDuration: '1000ms',
      hasBackdrop: true,
    });
  }

  // get realtime post data 
  getData() {
    onValue(
      ref(this.database, 'photos'),
      (snapshot) => {
        let x = 0;
        snapshot.forEach(childsnapshot => {
          // geting all the child snapshot form the snapshot of 'photos'
          const post: {
            uid: string;
            url: string;
            size: number;
            vote: number;
            name: string;
            timestamp: string;
          } = childsnapshot.val();

          // get user data from firestore
          this.firestore.getData('user', post.uid).then(
            (user) => {
              if (user != undefined) {
                this.postData[x++] = {
                  uid: post.uid,
                  url: post.url,
                  size: post.size,
                  vote: post.vote,
                  name: post.name,
                  timestamp: post.timestamp,
                  displayName: user['displayName'],
                  photoURL: user['photoURL']
                }
              }
            }
          );
        });
      }
    )
  }
}
