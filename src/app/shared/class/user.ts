import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Platform} from '@ionic/angular';
import {MenuController} from '@ionic/angular';
import {Display} from './display';
import firebase from 'firebase';
import {firebaseConfig} from '../../app.module';

@Injectable({
  providedIn: 'platform'
})
export class User {
  public userId: string;
  public mail: string;
  public method: any;
  private currentUser: any;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private menu: MenuController,
    private display: Display
  ) {
    this.connexion();

    // on initialise la base de donnée SDK JS
    firebase.initializeApp(firebaseConfig);
    this.initCurrentUser();
  }

  // initialise le currentUser
  initCurrentUser() {
    this.currentUser = firebase.auth().currentUser;
  }

  // test si l'on est sur une page de login
  isLoginPage() {
    return this.router.url === '/authenticate' || this.router.url.search('login') === 0 || this.router.url === '/register';
  }

  redirection() {
    this.platform.ready().then(() => {
      this.afAuth.authState.subscribe(auth => {
        if (auth) {
          if (this.isLoginPage()) {
            this.router.navigateByUrl('/').then();
          }
        } else {
          this.router.navigateByUrl('/authenticate').then();
        }
      });
    });
  }

  connexion() {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecté');
      } else {
        this.userId = auth.uid;
        this.mail = auth.email;
        this.method = auth.providerData[0].providerId;
      }
    });
  }

  logout() {
    this.display.displayError({code: 'Vous êtes déconnecté', color: 'success'}).then();

    this.menu.isOpen('menu')
      .then(res => {
        if (res) {
          this.menu.close().then();
        }
      })
      .catch(err => {
        this.display.displayError('Erreur menu : ' + err).then();
      });

    this.afAuth.signOut().then();
    this.userId = undefined;
    this.mail = undefined;
    this.method = undefined;
  }

  isConnectedWithEmail() {
    return this.method === 'password';
  }

  isEmailVerified() {
    if (!this.isConnectedWithEmail()) {
      return false;
    }
    if (this.currentUser === null) {
      this.initCurrentUser();
    }
    return this.currentUser.emailVerified;
  }

  changePassword(oldPassword, newPassword) {
    this.initCurrentUser();

    this.afAuth.signInWithEmailAndPassword(this.mail, oldPassword)
      .then(res => {
        this.currentUser.updatePassword(newPassword).then(() => {
          this.display.displayError({code: 'Mot de passe changé', color: 'success'}).then();
        }).catch((err) => {
          this.display.displayError('Erreur dans le changement de mot de passe : ' + err).then();
        });
      })
      .catch(err => {
        this.display.displayError('L\'ancien mot de passe entré est incorrect').then();
      });
  }

  sendEmailVerification() {
    this.initCurrentUser();
    this.currentUser.sendEmailVerification()
      .then(() => this.display.displayError({code: 'Email envoyé !', color: 'success'}));
  }

  suppAccount(password) {
    this.initCurrentUser();

    this.afAuth.signInWithEmailAndPassword(this.mail, password)
      .then(res => {
        this.currentUser.delete()
          .then(() => {
            this.display.displayError({code: 'Utilisateur supprimé', color: 'success'}).then();
          })
          .catch((err) => {
            this.display.displayError('Erreur suppression du compte : ' + err).then();
          });
      })
      .catch(err => {
        this.display.displayError('Le mot de passe entré est incorrect').then();
      });

  }
}
