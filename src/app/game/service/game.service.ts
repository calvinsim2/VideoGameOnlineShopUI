import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstant } from '../constant/api.constant';
import {
  GameModel,
  GameSubmissionModel,
  GameUpdateModel,
} from '../model/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  apiConstant: ApiConstant = new ApiConstant();
  constructor(private http: HttpClient) {}

  getAllGame() {
    return this.http.get<GameModel[]>(
      this.apiConstant.baseApiUrl + this.apiConstant.game
    );
  }

  getGamebyId(id: string) {
    return this.http.get<GameModel>(
      this.apiConstant.baseApiUrl + this.apiConstant.game + '/' + id
    );
  }

  addNewGame(gameSubmissionModel: GameSubmissionModel) {
    return this.http.post<GameSubmissionModel>(
      this.apiConstant.baseApiUrl + this.apiConstant.game,
      gameSubmissionModel
    );
  }

  updateGame(gameUpdateModel: GameUpdateModel) {
    return this.http.put<GameUpdateModel>(
      this.apiConstant.baseApiUrl +
        this.apiConstant.game +
        '/' +
        this.apiConstant.update,
      gameUpdateModel
    );
  }

  deleteGame(id: string) {
    return this.http.delete<string>(
      this.apiConstant.baseApiUrl + this.apiConstant.game + '/' + `${id}`
    );
  }
}
