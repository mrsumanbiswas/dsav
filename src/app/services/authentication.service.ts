import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signOut, signInWithPopup, signInWithRedirect, getRedirectResult } from '@angular/fire/auth';
import { FirestoreDatabaseService } from './firestore-database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLogedIn(): boolean {
    // saving to session storage
    this.auth.onAuthStateChanged(
      (user) => {
        sessionStorage.setItem(
          'isLogedIn', JSON.stringify(
            ((user?.uid === localStorage.getItem('uid')) && (localStorage.getItem('uid') !== null))
          )
        )
      }
    )
    // retriving from seeion storage
    return (sessionStorage.getItem('isLogedIn') === 'true') ? true : false;
  }

  signIn() {
    signInWithPopup(this.auth, new GoogleAuthProvider()).then(
      (credential) => {
        sessionStorage.setItem('user', JSON.stringify(credential.user))
      }
    ).finally(
      () => {
        const data = sessionStorage.getItem('user')
        if (data !== null) {
          var user = JSON.parse(data)
          // saving data to local storage
          localStorage.setItem('uid', user.uid)
          localStorage.setItem('photoURL', user.photoURL)
          localStorage.setItem('displayName', user.displayName)
          // saving data to detabase
          this.database.setData('user', user.uid, user)
        }
      }
    )
  }


  // logout/signout
  async signOut() {
    await signOut(this.auth);
    localStorage.clear();
    sessionStorage.clear();
    location.replace('/');
  }

  constructor(private auth: Auth, private database: FirestoreDatabaseService) { }

}
