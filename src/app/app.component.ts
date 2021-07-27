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
        if (auth) {
          console.log('/');
          this.router.navigateByUrl('/').then();
        } else {
          console.log('/authenticate');
          this.router.navigateByUrl('/authenticate').then();
        }
      });
    });
  }
}

