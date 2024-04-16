import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstant } from '../constant/api.constant';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  apiConstant: ApiConstant = new ApiConstant();
  constructor(private http: HttpClient) {}

  getAllGame() {
    return this.http.get<any>(
      this.apiConstant.baseApiUrl + this.apiConstant.game
    );
  }

  getGamebyId(id: string) {
    return this.http.get<any>(
      this.apiConstant.baseApiUrl + this.apiConstant.game + '/' + id
    );
  }

  getExplicitCodeMatureRating(codes: string) {
    return this.http.get<any>(
      this.apiConstant.baseApiUrl +
        this.apiConstant.codesTable +
        '/' +
        this.apiConstant.matureRating +
        '/' +
        codes
    );
  }

  getSelectedCodeGenre(codes: string) {
    return this.http.get<any>(
      this.apiConstant.baseApiUrl +
        this.apiConstant.codesTable +
        '/' +
        this.apiConstant.genre +
        '/selected/' +
        codes
    );
  }

  getSelectedCodePlatform(codes: string) {
    return this.http.get<any>(
      this.apiConstant.baseApiUrl +
        this.apiConstant.codesTable +
        '/' +
        this.apiConstant.platform +
        '/selected/' +
        codes
    );
  }
}
