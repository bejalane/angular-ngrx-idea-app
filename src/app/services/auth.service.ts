import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { AuthType, AuthDTO } from '@app/models/auth';
import { Observable } from 'rxjs';
import { User } from '@app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api: string = environment.api_server + '/';

  constructor(private http: HttpClient) {}

  private auth(authType: AuthType, data: AuthDTO): Observable<User> {
    return this.http.post<User>(`${this.api}/${authType}`, data);
  }

  login(data: AuthDTO): Observable<User> {
    return this.auth('login', data);
  }

  register(data: AuthDTO): Observable<User> {
    return this.auth('register', data);
  }

  checkLogin() {
    return this.http.get(`${this.api}/checkLogin`, {
      headers: { authorization: `Bearer ${this.token}` },
    });
  }

  get token() {
    return localStorage.getItem('token');
  }

  set token(val: string) {
    if (val) {
      localStorage.setItem('token', val);
    } else {
      localStorage.removeItem('token');
    }
  }
}
