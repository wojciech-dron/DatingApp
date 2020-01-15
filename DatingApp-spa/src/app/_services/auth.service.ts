import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.jpg');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }

  changeNumberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        // const user = response; // pominiety etap z deklaracją obiektu user
        if (response) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user))
          this.decodedToken = this.jwtHelper.decodeToken(response.token);
          this.currentUser = response.user;
          this.changeNumberPhoto(this.currentUser.photoUrl);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
