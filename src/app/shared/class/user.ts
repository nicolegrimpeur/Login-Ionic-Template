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
  public userData = {
    userId: undefined,
    mail: undefined,
    method: undefined,
    displayName: undefined
  };
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

  // redirige l'utilisateur s'il est connecté ou non
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

  // ajoute au compte un nom d'utilisateur
  addDisplayName(name) {
    this.initCurrentUser();
    this.currentUser.updateProfile({ displayName: name })
      .then(res => {
        console.log('ayez', res);
      })
      .catch(err => {
        this.display.displayError('Erreur lors de l\'ajout du nom d\'utilisateur').then();
      });
  }

  // ajoute au compte une url de photo (utilisé pour stocker les jamId de JustAuthMe)
  addUrlPhoto(url) {
    this.initCurrentUser();
    this.currentUser.updateProfile({ photoURL: url })
      .then(res => {
        console.log('ayez', res);
      })
      .catch(err => {
        this.display.displayError('Erreur lors de l\'ajout du jamIs').then();
      });
  }

  // récupère les données de connexion
  connexion() {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        if (!auth.isAnonymous) {
          this.userData.mail = auth.email;
          this.userData.method = auth.providerData[0].providerId;
          this.userData.displayName = auth.displayName;
        }
        this.userData.userId = auth.uid;
      }
    });
  }

  // déconnecte l'utilisateur
  logout() {
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

    this.display.displayError({code: 'Vous êtes déconnecté', color: 'success'}).then();

    this.userData.userId = undefined;
    this.userData.mail = undefined;
    this.userData.method = undefined;
    this.userData.displayName = undefined;
  }

  // test si l'utilisateur est connecté avec un mail / mot de passe ou pas
  isConnectedWithEmail() {
    return this.userData.method === 'password';
  }

  // test si l'utilisateur a vérifié son mail ou non
  isEmailVerified() {
    if (!this.isConnectedWithEmail()) {
      return false;
    }
    if (this.currentUser === null) {
      this.initCurrentUser();
    }
    return this.currentUser.emailVerified;
  }

  // envoi l'email de vérification à l'utilisateur
  sendEmailVerification() {
    this.initCurrentUser();
    this.currentUser.sendEmailVerification()
      .then(() => this.display.displayError({code: 'Email envoyé !', color: 'success'}));
  }

  // modifie le mot de passe
  changePassword(oldPassword, newPassword) {
    this.initCurrentUser();

    // on reconnecte d'abord l'utilisateur, puis on change le mot de passe
    this.afAuth.signInWithEmailAndPassword(this.userData.mail, oldPassword)
      .then(res => {
        this.currentUser.updatePassword(newPassword).then(() => {
          this.display.displayError({code: 'Mot de passe changé', color: 'success'}).then();
          this.router.navigateByUrl('/').then();
        }).catch((err) => {
          this.display.displayError('Erreur dans le changement de mot de passe : ' + err).then();
        });
      })
      .catch(err => {
        this.display.displayError('L\'ancien mot de passe entré est incorrect').then();
      });
  }

  // test avant suppression du compte utilisateur
  suppAccount(password) {
    this.initCurrentUser();

    // on connecte l'utilisateur en fonction de la méthode de connexion
    switch (this.userData.method) {
      case 'google.com':
        this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then((result) => {
            this.suppressionDuCompte();
          })
          .catch(err => {
            this.display.displayError(err).then();
          });
        break;
      case 'microsoft.com':
        this.afAuth.signInWithPopup(new firebase.auth.OAuthProvider('microsoft.com'))
          .then((result) => {
            this.suppressionDuCompte();
          })
          .catch(err => {
            this.display.displayError(err).then();
          });
        break;
      case 'github.com':
        this.afAuth.signInWithPopup(new firebase.auth.GithubAuthProvider())
          .then((result) => {
            this.suppressionDuCompte();
          })
          .catch(err => {
            this.display.displayError(err).then();
          });
        break;
      case undefined:
        this.suppressionDuCompte();
        break;
      default:
        this.afAuth.signInWithEmailAndPassword(this.userData.mail, password)
          .then(res => {
            this.suppressionDuCompte();
          })
          .catch(err => {
            this.display.displayError('Le mot de passe entré est incorrect').then();
          });
        break;
    }
  }

  // suppression du compte utilisateur -> ne peut pas être lancé avant d'avoir reconnecté l'utilisateur
  suppressionDuCompte() {
    this.currentUser.delete()
      .then(() => {
        this.display.displayError({code: 'Utilisateur supprimé', color: 'success'}).then();
      })
      .catch((err) => {
        this.display.displayError('Erreur suppression du compte : ' + err).then();
      });
  }
}
