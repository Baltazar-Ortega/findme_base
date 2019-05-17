import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth, private router: Router, private http: HttpClient) { }

  login(email: string, password: string) {
      return new Promise((resolve, rejected) => {
        this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
          resolve(user);
        }).catch(err => {
          rejected(err);
        });
      });
  }

  logout() {
    this.AFauth.auth.signOut().then(_ => {
      this.router.navigate(['/login']);
    });
  }

  register(email: string, password: string, nombreUsuario: string) {
    return new Promise ((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then(res => {
        console.log('uid del usuario', res.user.uid); // Podemos guardar este valor
        const id = res.user.uid;
        const usuario = {
          uid: id,
          nombreUsuario,
          email,
          password
        };
        this.http.post('https://findme-proyecto-9d68a.firebaseio.com/usuarios.json', usuario).subscribe(_ => {
          resolve(res);
        });
      }).catch(err => {
        reject(err);
      });
    });
  }
}
