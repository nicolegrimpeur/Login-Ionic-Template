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
  // data utilisés pour la connexion
  public loginData = {
    email: '',
    password: ''
  };
  // pour désactiver le bouton
  public disabledButton = false;

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    public display: Display
  ) {
    let after = false;
    // récupère l'email dans le lien
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

  // connecte l'utilisateur avec email et mot de passe
  login() {
    this.afAuth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
      .then(auth => {
        this.router.navigateByUrl('/').then();
      })
      .catch(err => {
        this.display.displayError(err).then();
      });
  }

  // permet d'envoyer un mail de réinitialisation de mot de passe
  async reInitialisationPassword() {
    this.afAuth.fetchSignInMethodsForEmail(this.loginData.email)
      .then(auth => {
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
