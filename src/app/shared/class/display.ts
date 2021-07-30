import {ToastController} from '@ionic/angular';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Display {
  constructor(
    public toastController: ToastController
  ) {
  }

  async displayError(err: any) {
    let strMessage;

    if (err.code === 'auth/user-not-found') {
      strMessage = 'Aucun utilisateur enregistré avec cette adresse email, merci de vous créer un compte';
    } else if (err.code === 'auth/wrong-password') {
      strMessage = 'Mot de passe incorrect';
    } else if (err.code === 'auth/network-request-failed') {
      strMessage = 'Pas de connexion internet';
    } else if (err.code === 'auth/user-cancelled') {
      strMessage = 'Votre organisation doit d\'abord valider la connexion';
    } else if (err.code === 'auth/account-exists-with-different-credential') {
      strMessage = 'L\'adresse email utilisée est associé à un autre compte';
    } else if (err.code === 'auth/popup-closed-by-user') {
      strMessage = 'La popup de connexion a été fermé brusquement, veuillez réessayer ' +
        'ou désactiver votre adblocker si l\'erreur continue de se produire';
    } else if (err.code === 'auth/too-many-requests') {
      strMessage = 'L\'accès à ce compte a été temporairement désactivé en raison de nombreuses tentatives de connexion infructueuses. ' +
        'Vous pouvez le rétablir immédiatement en réinitialisant votre mot de passe ou vous pouvez réessayer plus tard.';
    } else {
      strMessage = err;
    }

    const toast = await this.toastController.create({
      message: strMessage,
      duration: 5000,
      position: 'top',
      color: 'danger'
    });
    await toast.present();
  }
}
