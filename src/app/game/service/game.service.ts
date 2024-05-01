import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstant } from '../constant/api.constant';
import { GameModel, GameSubmissionModel } from '../model/game.model';

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
    this.http.post<GameSubmissionModel>(
      this.apiConstant.baseApiUrl + this.apiConstant.game,
      gameSubmissionModel
    );
  }
}
