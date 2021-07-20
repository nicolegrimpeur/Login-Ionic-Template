import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {AngularFireAuth} from "@angular/fire/auth";

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
    public toastController: ToastController,
    public afAuth: AngularFireAuth
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
        this.displayError(err).then();
      });
  }

  async displayError(err: string) {
    const toast = await this.toastController.create({
      message: err,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }
}
