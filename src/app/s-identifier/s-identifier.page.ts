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
  // variable pour le champ de mail
  public email: string;

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    private display: Display
  ) {
  }

  ngOnInit() {
  }

  // au clic sur le bouton continuer
  continu() {
    // on check si l'email est déjà associé ou non à un utilisateur
    this.afAuth.fetchSignInMethodsForEmail(this.email)
      .then(auth => {
        // on check si l'email est connecté ou non avec un provider
        if (auth[0] === 'google.com') {
          this.googleAuth();
        } else if (auth[0] === 'microsoft.com') {
          this.microsoftAuth();
        } else if (auth[0] === 'github.com') {
          this.githubAuth();
        } else if (auth.length === 1) { // si le mail existe, on l'envoi sur la page de login
          this.router.navigateByUrl('login?' + this.email).then();
        } else { // sinon on l'envoi sur la page pour créer un compte
          this.router.navigateByUrl('register?' + this.email).then();
        }
      })
      .catch(err => {
        this.display.displayError(err).then();
      });
  }

  googleAuth() {
    // connexion de l'utilisateur avec Google
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => {
        this.router.navigateByUrl('/').then();
      })
      .catch(err => {
        this.display.displayError(err).then();
      });
  }

  microsoftAuth() {
    // connexion de l'utilisateur avec Microsoft
    this.afAuth.signInWithPopup(new firebase.auth.OAuthProvider('microsoft.com'))
      .then((res) => {
        this.router.navigateByUrl('/').then();
      })
      .catch(err => {
        this.display.displayError(err).then();
      });
  }

  githubAuth() {
    // connexion de l'utilisateur avec Github
    this.afAuth.signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((res) => {
        this.router.navigateByUrl('/').then();
      })
      .catch(err => {
        this.display.displayError(err).then();
      });
  }

  anonymousAuth() {
    // connexion en temps qu'invité
    this.afAuth.signInAnonymously()
      .then(res => {
        this.router.navigateByUrl('/').then();
      })
      .catch(err => {
        this.display.displayError(err).then();
      });
  }
}
