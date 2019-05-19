import { map } from 'rxjs/operators';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  usuarios: Array<any> = [];
  constructor(private AFauth: AngularFireAuth, private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

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

  infoActualUser() {
    return new Promise((resolve, rejected) => {
      this.AFauth.auth.onAuthStateChanged(user => {
        if (user) {
          console.log('Usuario signed in');
          resolve(user);
        } else {
          console.log('Usuario NOT signed in');
        }
      });
    });
  }

  getUsers() {
    const usuarios: Array<any> = [];
    return this.http.get('https://findme-proyecto-9d68a.firebaseio.com/usuarios.json').pipe(map(resData => {
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
            usuarios.push({
              key,
              email: resData[key].email,
              nombreUsuario: resData[key].nombreUsuario,
              uid: resData[key].uid,
              password: resData[key].password
            });
          }
      }
      this.usuarios = usuarios;
      console.log('usuarios', this.usuarios);
      return this.usuarios;
    }));
  }

  getActualUser() {
    let usuarioActual = null;
    return new Promise((resolve, rejected) => {
      this.getUsers().subscribe(usuarios => {
        this.infoActualUser().then(actualUser => {
          console.log('actual user', actualUser);
          usuarios.forEach(usuario => {
            if (usuario.uid === (actualUser as any).uid) {
              console.log('UIDs iguales');
              usuarioActual = usuario;
              console.log('Usuario actual', usuarioActual);
              resolve(usuarioActual);
            } 
          });
          if(!usuarioActual) {
            rejected(usuarioActual);
          }
        });
      });
    });
  }

}
