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
  // données de la page register
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
    // récupère l'email dans le lien
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
    // si les deux mots de passe sont égaux
    if (this.registerData.password === this.registerData.confirmPassword) {
      // on connecte l'utilisateur
      this.signUp();
    }
    else {
      // sinon on envoi un message d'erreur
      this.display.displayError('Les deux mots de passe sont différents, veuillez réessayer').then();
      this.registerData.password = '';
      this.registerData.confirmPassword = '';
    }
  }

  // créé l'utilisateur à partir du mail entré et du mot de passe
  signUp() {
    this.afAuth.createUserWithEmailAndPassword(this.registerData.email, this.registerData.password)
      .then(auth => {
        // on redirige l'utilisateur sur la page d'accueil
        this.router.navigateByUrl('/').then();
        // on enregistre ensuite le nom d'utilisateur
        this.user.addDisplayName(this.registerData.displayName);
      })
      .catch(err => {
        // sinon on affiche une erreur
        this.display.displayError(err).then();
      });
  }
}
