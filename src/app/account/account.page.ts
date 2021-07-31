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
  public oldPassword: string;
  public newPassword: string;
  public confirmNewPassword: string;
  public password: string;
  public disabledButton: boolean;

  constructor(
    private menu: MenuController,
    public user: User,
    private display: Display
  ) {
    this.disabledButton = false;
    console.log(!user.isEmailVerified());
  }

  ngOnInit() {
  }

  sendEmailVerification() {
    this.disabledButton = true;
    this.user.sendEmailVerification();
  }

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

  suppressionAccount() {
    this.user.suppAccount(this.password);
    this.password = '';
  }
}
