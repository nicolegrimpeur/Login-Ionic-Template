import {Component} from '@angular/core';
import {User} from '../shared/class/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    public user: User
  ) {
  }
}
