import {Injectable} from '@angular/core';
import {JustAuthMe} from '../models/justAuthMe';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private textApi = '' +
    'https://core.justauth.me/api/data?secret=17vCoILla514ErVbOKaVQ4Id3OujjX6p&access_token=62ebd06669b166fa47ab1ba212cd1a04';

  constructor(private readonly http: HttpClient) {
  }

  // récupère le json en ligne
  getApi(): Observable<JustAuthMe> {
    const url = this.textApi;
    return this.http.get<JustAuthMe>(url);
  }
}
