import {ToastController} from '@ionic/angular';

export class Display {
  constructor(public toastController: ToastController) {
  }

  async displayError(err: any) {
    let strMessage;

    if (err.code === 'auth/user-not-found') {
      strMessage = 'Aucun utilisateur enregistré avec cette adresse email, merci de vous créer un compte';
    } else if (err.code === 'auth/wrong-password') {
      strMessage = 'Mot de passe incorrect';
    } else if (err.code === 'auth/too-many-requests') {
      strMessage = 'L\'accès à ce compte a été temporairement désactivé en raison de nombreuses tentatives de connexion infructueuses. ' +
        'Vous pouvez le rétablir immédiatement en réinitialisant votre mot de passe ou vous pouvez réessayer plus tard.';
    } else {
      strMessage = err;
    }

    const toast = await this.toastController.create({
      message: strMessage,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }
}
