import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

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

  constructor(
    public router: Router,
    public toastController: ToastController,
    public afAuth: AngularFireAuth
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
      })
      .catch(err => {
        console.log('Erreur: ' + err);
        this.displayError(err).then();
      });
  }

  async displayError(err: any) {
    let strMessage;

    if (err.code === 'auth/user-not-found') {
      strMessage = 'Aucun utilisateur enregistré avec cette adresse email, merci de vous créer un compte';
    } else if (err.code === 'auth/wrong-password') {
      strMessage = 'Mot de passe incorrect';
    } else if (err.code === 'auth/too-many-requests') {
      strMessage = 'L\'accès à ce compte a été temporairement désactivé en raison de nombreuses tentatives de connexion infructueuses. ' +
        'Vous pouvez le rétablir immédiatement en réinitialisant votre mot de passe ou vous pouvez réessayer plus tard.';
    } else {
      strMessage = err;
    }

    const toast = await this.toastController.create({
      message: strMessage,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }

  reInitialisationPassword() {
    console.log(this.loginData.email);

    this.afAuth.fetchSignInMethodsForEmail(this.loginData.email)
      .then(auth => {
          console.log('erreur : ', auth);
          if (auth.length === 1) { // si le mail existe, on réinitialise le mot de passe
            this.afAuth.sendPasswordResetEmail(this.loginData.email)
              .then(res => {
                this.displayError('Email envoyé.').then();
              });
          } else { // sinon on affiche une erreur
            this.router.navigateByUrl('/authenticate').then();
          }
        }
      );
  }
}
