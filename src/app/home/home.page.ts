import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public userId: string;
  public mail: string;
  public method: any;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecté');
        console.log(this.router.url);
        this.router.navigateByUrl('/authenticate').then();
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
