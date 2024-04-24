import { Injectable } from '@angular/core';
import { ApiConstant } from '../constant/api.constant';
import { HttpClient } from '@angular/common/http';
import { CodesTableModel } from '../model/codesTable.model';

@Injectable({
  providedIn: 'root',
})
export class CodesTableService {
  apiConstant: ApiConstant = new ApiConstant();
  constructor(private http: HttpClient) {}

  getAllCodeMatureRating() {
    return this.http.get<CodesTableModel[]>(this.apiConstant.baseApiUrl +
      this.apiConstant.codesTable +
      '/' +
      this.apiConstant.matureRating)
  }

  getExplicitCodeMatureRating(codes: string) {
    return this.http.get<CodesTableModel>(
      this.apiConstant.baseApiUrl +
        this.apiConstant.codesTable +
        '/' +
        this.apiConstant.matureRating +
        '/' +
        codes
    );
  }

  getAllCodeGenre() {
    return this.http.get<CodesTableModel[]>(this.apiConstant.baseApiUrl +
      this.apiConstant.codesTable +
      '/' +
      this.apiConstant.genre)
  }

  getSelectedCodeGenre(codes: string) {
    return this.http.get<CodesTableModel[]>(
      this.apiConstant.baseApiUrl +
        this.apiConstant.codesTable +
        '/' +
        this.apiConstant.genre +
        '/selected/' +
        codes
    );
  }

  getAllCodePlatform() {
    return this.http.get<CodesTableModel[]>(this.apiConstant.baseApiUrl +
      this.apiConstant.codesTable +
      '/' +
      this.apiConstant.platform)
  }

  getSelectedCodePlatform(codes: string) {
    return this.http.get<CodesTableModel[]>(
      this.apiConstant.baseApiUrl +
        this.apiConstant.codesTable +
        '/' +
        this.apiConstant.platform +
        '/selected/' +
        codes
    );
  }
}
