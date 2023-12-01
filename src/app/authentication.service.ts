import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:3000'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/auth/login`, body);
  }

  register(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/auth/register`, body);
  }

  saveToken(token) {
    localStorage.setItem('mobigic_token', token)
  }
  isAuthenticated(){
    return localStorage.getItem('mobigic_token')
  }

}
