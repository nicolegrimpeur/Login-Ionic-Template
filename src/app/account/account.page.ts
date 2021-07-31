import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {User} from '../shared/class/user';
import {Display} from '../shared/class/display';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  // pour le changement de mot de passe
  public oldPassword: string;
  public newPassword: string;
  public confirmNewPassword: string;

  // pour la suppression du compte
  public password: string;

  // pour désactiver le bouton lors de l'envoi de la vérification du mail
  public disabledButton: boolean;

  constructor(
    private menu: MenuController,
    public user: User,
    private display: Display
  ) {
    this.disabledButton = false;
    this.password = '';
  }

  ngOnInit() {
  }

  // désactive le bouton puis lance l'email de vérification
  sendEmailVerification() {
    this.disabledButton = true;
    this.user.sendEmailVerification();
  }

  //vérifie si les mots de passe sont bien les mêmes, puis change le mot de passe
  changePassword() {
    if (this.newPassword === this.confirmNewPassword) {
      this.user.changePassword(this.oldPassword, this.newPassword);
    }
    else {
      this.display.displayError('Les deux mots de passe sont différents').then();
    }

    this.oldPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';
  }

  // supprime le compte puis remet à 0 le mot de passe sur la page
  suppressionAccount() {
    this.user.suppAccount(this.password);
    this.password = '';
  }
}
