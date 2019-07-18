
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ArtistData } from './models/artisteData.model';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  


  uri: string = 'http://localhost:8000'


  constructor(private httpClient: HttpClient) { }



  addArtist(artisteData) {
    return this.httpClient.post<ArtistData[]>(`${this.uri}/artiste/`, artisteData);

  }
  deleteArtist(id:number) {
    return this.httpClient.delete(`${this.uri}/artiste/${id}`);

  }
  putArtistId(artisteId,artisteData) {
    return this.httpClient.put(`${this.uri}/artiste/${artisteId}`, artisteData);
  }

  getArtist() {
    return this.httpClient.get(`${this.uri}/artiste`);
  }
}
