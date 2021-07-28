import {Component} from '@angular/core';

import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public userId: string;
  public mail: string;
  public method: any;

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    private platform: Platform
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.afAuth.authState.subscribe(auth => {
        console.log(this.router.url);
        if (auth) {
          if (this.router.url === '/authenticate' || this.router.url.search('login') === 0 || this.router.url === '/register') {
            this.router.navigateByUrl('/').then();
          }
        } else {
          console.log('/authenticate');
          this.router.navigateByUrl('/authenticate').then();
        }
      });
    });

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
    this.afAuth.signOut().then();
  }
}

