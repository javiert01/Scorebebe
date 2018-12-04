import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Neonato } from './neonato.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';




@Injectable()
export class NeonatoService {

    urlServidor = 'http://181.199.39.194'
    constructor(private http: HttpClient) {
    }

    addNeonato (neonato: Neonato) {
        return this.http.post(this.urlServidor+':1337/neonato', neonato);
    }

    getNeonatos(){
        return this.http.get<any>(this.urlServidor+':1337/neonato');
      }
}
