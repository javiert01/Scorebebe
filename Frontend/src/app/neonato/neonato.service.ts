import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Neonato } from './neonato.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';




@Injectable()
export class NeonatoService {

    urlServidor = 'https://scorebebe.herokuapp.com/'
    //urlServidor = 'http://localhost:1337/'
    constructor(private http: HttpClient) {
    }

    addNeonato (neonato: Neonato) {
        return this.http.post(this.urlServidor+'neonato', neonato);
    }

    getNeonatos(){
        return this.http.get<any>(this.urlServidor+'neonato');
      }

      getNeonatoIngresado(){
          return this.http.get<any>(this.urlServidor+'neonato/ultimoneonatoingresado');
      }

      getNeonatoIdUsuario(id: number){
        return this.http.get<any>(this.urlServidor+'neonato/neonatousuario/'+id.toString())
      }
}
