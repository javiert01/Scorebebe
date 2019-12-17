import { Injectable } from '@angular/core';
import { Neonato } from './neonato.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable()
export class NeonatoService {
    // urlServidor = 'https://scorebbtest.herokuapp.com/';

    urlServidor = 'https://scorebebe.herokuapp.com/';
    // tslint:disable-next-line: comment-format
    //urlServidor = 'http://localhost:1337/'
    constructor(private http: HttpClient) {
    }

    addNeonato (neonato: Neonato) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        })
      };
      console.log(httpOptions);
        return this.http.post<any>(this.urlServidor + 'neonato', neonato, httpOptions);
    }

    getNeonatos() {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        })
      };
        return this.http.get<any>(this.urlServidor + 'neonato?limit=1000', httpOptions);
      }

      getNeonatoIngresado() {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          })
        };
          return this.http.get<any>(this.urlServidor + 'neonato/ultimoneonatoingresado', httpOptions);
      }

      getNeonatoIdUsuario(id: number) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          })
        };
        return this.http.get<any>(this.urlServidor + 'neonato/neonatousuario/' + id.toString(), httpOptions);
      }

      getIDGruposComorbilidades(idDiagnosticos: string[]) {
        const ids = {
          'params': idDiagnosticos
        };
        return this.http.post<any>(this.urlServidor + 'ciediez/grupo', ids);
      }
}
