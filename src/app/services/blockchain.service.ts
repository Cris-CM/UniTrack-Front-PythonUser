import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private apiUrl = `${environment.ApiBackEndUrl}/blockchain`;

  constructor(private http: HttpClient) { }

  addBlock(data: any, idUsuario: number) {
    return this.http.post(`${this.apiUrl}/add`, { data, idUsuario });
  }

  getChain() {
    return this.http.get(`${this.apiUrl}`);
  }
}