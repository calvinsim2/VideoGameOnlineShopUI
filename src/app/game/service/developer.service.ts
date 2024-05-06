import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstant } from '../constant/api.constant';
import {
  DeveloperModel,
  DeveloperSubmissionModel,
} from '../model/developer.model';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {
  apiConstant: ApiConstant = new ApiConstant();
  constructor(private http: HttpClient) {}

  getAllDeveloper() {
    return this.http.get<DeveloperModel[]>(
      this.apiConstant.baseApiUrl + this.apiConstant.developer
    );
  }

  addNewDeveloper(developerSubmissionModel: DeveloperSubmissionModel) {
    return this.http.post<DeveloperSubmissionModel>(
      this.apiConstant.baseApiUrl +
        this.apiConstant.developer +
        '/' +
        this.apiConstant.add,
      developerSubmissionModel
    );
  }
}
