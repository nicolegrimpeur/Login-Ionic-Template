import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Display} from '../shared/functions/displayError';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerData = {
    email: '',
    password: ''
  };

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    public display: Display
  ) {
    let after = false;
    for (const i of this.router.url) {
      if (after && i !== '=') {
        this.registerData.email += i;
      }
      else if (i === '?') {
        after = true;
      }
    }

  }

  ngOnInit() {
  }

  signUp() {
    this.afAuth.createUserWithEmailAndPassword(this.registerData.email, this.registerData.password)
      .then(auth => {
        console.log('utilisateur connecté');
      })
      .catch(err => {
        console.log('Erreur: ' + err);
        this.display.displayError(err).then();
      });
  }
}
