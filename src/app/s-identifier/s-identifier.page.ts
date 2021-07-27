import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Display} from '../shared/class/display';
import firebase from 'firebase';

@Component({
  selector: 'app-s-identifier',
  templateUrl: './s-identifier.page.html',
  styleUrls: ['./s-identifier.page.scss'],
})
export class SIdentifierPage implements OnInit {
  public email: string;

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    private display: Display
  ) {
  }

  ngOnInit() {
  }

  continu() {
    this.afAuth.fetchSignInMethodsForEmail(this.email)
      .then(auth => {
        console.log('erreur : ', auth);
        if (auth[0] === 'google.com') {
          this.googleAuth();
        } else if (auth[0] === 'microsoft.com') {
          this.microsoftAuth();
        } else if (auth.length === 1) { // si le mail existe, on l'envoi sur la page de login
          this.router.navigateByUrl('login?' + this.email).then();
        } else { // sinon on l'envoi sur la page pour créer un compte
          this.router.navigateByUrl('register?' + this.email).then();
        }
      });
  }

  googleAuth() {
    console.log('google');
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        this.router.navigateByUrl('/').then();
      })
      .catch(err => {
        this.display.displayError(err).then();
      });
  }

  microsoftAuth() {
    console.log('microsoft');
    this.afAuth.signInWithPopup(new firebase.auth.OAuthProvider('microsoft.com'))
      .then((result) => {
        this.router.navigateByUrl('/').then();
      })
      .catch(err => {
        this.display.displayError(err).then();
      });
  }

  githubAuth() {
    console.log('github');
    this.afAuth.signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((result) => {
        this.router.navigateByUrl('/').then();
      })
      .catch(err => {
        this.display.displayError(err).then();
      });
  }
}
