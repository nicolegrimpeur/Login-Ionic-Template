import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Display} from '../shared/class/display';
import {User} from '../shared/class/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerData = {
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  };

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    public display: Display,
    private user: User
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

  // fonction pour vérifier que les mots de passe sont identiques
  checkMdp() {
    if (this.registerData.password === this.registerData.confirmPassword) {
      this.signUp();
    }
    else {
      this.display.displayError('Les deux mots de passe sont différents, veuillez réessayer').then();
      this.registerData.password = '';
      this.registerData.confirmPassword = '';
    }
  }

  signUp() {
    this.afAuth.createUserWithEmailAndPassword(this.registerData.email, this.registerData.password)
      .then(auth => {
        console.log('utilisateur connecté');
        this.router.navigateByUrl('/').then();
        this.user.addDisplayName(this.registerData.displayName);
      })
      .catch(err => {
        console.log('Erreur: ' + err);
        this.display.displayError(err).then();
      });
  }
}
