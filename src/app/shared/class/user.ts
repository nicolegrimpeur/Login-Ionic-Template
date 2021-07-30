import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Platform} from '@ionic/angular';
import {MenuController} from '@ionic/angular';
import {Display} from './display';

@Injectable({
  providedIn: 'platform'
})
export class User {
  public userId: string;
  public mail: string;
  public method: any;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private menu: MenuController,
    private display: Display
  ) {
    this.connexion();
  }

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
          console.log('/authenticate');
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
        console.log('connecté: ' + auth.uid);
        this.userId = auth.uid;
        this.mail = auth.email;
        this.method = auth.providerData[0].providerId;
      }
    });
  }

  logout() {
    console.log('déconnexion');
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
}
