import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {User} from '../shared/class/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private menu: MenuController,
    public user: User
  ) {
  }

  async openMenu() {
    await this.menu.open();
  }
}
