import {Component} from '@angular/core';
import {User} from './shared/class/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [User]
})
export class AppComponent {
  constructor(
    public user: User
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.user.redirection();
  }
}

