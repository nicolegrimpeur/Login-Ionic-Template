import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-s-identifier',
  templateUrl: './s-identifier.page.html',
  styleUrls: ['./s-identifier.page.scss'],
})
export class SIdentifierPage implements OnInit {
  public email: string;

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth
  ) {
  }
  ngOnInit() {
  }

  continu() {
    this.afAuth.fetchSignInMethodsForEmail(this.email)
      .then(auth => {
        console.log('erreur : ', auth);
        if (auth.length === 1) { // si le mail existe, on l'envoi sur la page de login
          this.router.navigateByUrl('login?' + this.email).then();
        }
        else { // sinon on l'envoi sur la page pour créer un compte
          this.router.navigateByUrl('register?' + this.email).then();
        }
      });
  }
}
