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

  // affiche d'un toast contenant le texte de l'erreur
  async displayError(err: any) {
    let strMessage;
    let couleur = 'danger';

    // on vérifie par rapport aux codes connus et on affiche le texte désiré en fonction
    // sinon on donne le texte de l'erreur à afficher
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
    } else if (err.code === 'auth/weak-password') {
      strMessage = 'Mot de passe faible, celui ci doit être d\'au moins 6 caractères';
    } else if (err.code === 'auth/popup-closed-by-user') {
      strMessage = 'La popup de connexion a été fermé brusquement, veuillez réessayer ' +
        'ou désactiver votre adblocker si l\'erreur continue de se produire';
    } else if (err.code === 'auth/too-many-requests') {
      strMessage = 'L\'accès à ce compte a été temporairement désactivé en raison de nombreuses tentatives de connexion infructueuses. ' +
        'Vous pouvez le rétablir immédiatement en réinitialisant votre mot de passe ou vous pouvez réessayer plus tard.';
    } else {
      strMessage = err;
    }

    // si l'on donne une couleur dans l'erreur
    if (err.color !== undefined) {
      strMessage = err.code;
      couleur = err.color;
    }

    // création du toast
    const toast = await this.toastController.create({
      message: strMessage,
      duration: 4000,
      position: 'top',
      color: couleur
    });
    // affichage du toast
    await toast.present();
  }
}
