import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Display} from '../shared/class/display';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginData = {
    email: '',
    password: ''
  };
  public disabledButton = false;

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    public display: Display
  ) {
    let after = false;
    for (const i of this.router.url) {
      if (after && i !== '=') {
        this.loginData.email += i;
      } else if (i === '?') {
        after = true;
      }
    }
  }

  ngOnInit() {
  }

  login() {
    this.afAuth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
      .then(auth => {
        console.log('utilisateur connecté');
        this.router.navigateByUrl('/').then();
      })
      .catch(err => {
        console.log('Erreur: ' + err);
        this.display.displayError(err);
      });
  }

  async reInitialisationPassword() {
    console.log(this.loginData.email);

    this.afAuth.fetchSignInMethodsForEmail(this.loginData.email)
      .then(auth => {
          console.log('erreur : ', auth);
          if (auth.length === 1) { // si le mail existe, on réinitialise le mot de passe
            this.afAuth.sendPasswordResetEmail(this.loginData.email)
              .then(res => {
                this.display.displayError('Email envoyé.');
                this.disabledButton = true;
              });
          } else { // sinon on redirige vers la page d'authentification
            this.display.displayError('L\'email entré n\'existe pas dans la base de donnée');
            this.router.navigateByUrl('/authenticate').then();
          }
        }
      );
  }
}
