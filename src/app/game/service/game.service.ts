import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public baseApiUrl: string = 'https://localhost:7269/api/Game';
  constructor(private http: HttpClient) {}

  getAllGame() {
    return this.http.get<any>(this.baseApiUrl);
  }

  getGamebyId(id: string) {
    return this.http.get<any>(this.baseApiUrl + '/' + id);
  }
}
