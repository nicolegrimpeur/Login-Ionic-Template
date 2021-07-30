import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    private menu: MenuController
  ) {
    this.menu.isOpen('menu')
      .then(res => {
        console.log(res, 'res');
      })
      .catch(err => {
        console.log(err, 'menu');
      });
  }

  ngOnInit() {
  }

}
