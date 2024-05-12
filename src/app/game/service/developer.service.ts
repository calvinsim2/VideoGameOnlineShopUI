import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstant } from '../constant/api.constant';
import {
  DeveloperModel,
  DeveloperSubmissionModel,
  DeveloperUpdateModel,
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

  getDeveloperById(id: string) {
    return this.http.get<DeveloperModel>(
      this.apiConstant.baseApiUrl + this.apiConstant.developer + `/${id}`
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

  updateDeveloper(developerUpdateModel: DeveloperUpdateModel) {
    return this.http.put<DeveloperUpdateModel>(
      this.apiConstant.baseApiUrl +
        this.apiConstant.developer +
        '/' +
        this.apiConstant.update,
      developerUpdateModel
    );
  }

  deleteDeveloper(id: string) {
    return this.http.delete(
      this.apiConstant.baseApiUrl + this.apiConstant.developer + `/${id}`
    );
  }
}
