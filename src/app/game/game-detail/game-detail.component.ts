import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../service/game.service';
import { ActivatedRoute } from '@angular/router';
import { GameModel } from '../model/game.model';
import {
  CodesTableListModel,
  CodesTableModel,
} from '../model/codesTable.model';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent {
  gameId!: string;
  gameDetail!: GameModel;
  matureRating!: CodesTableModel;
  matureRatingDecodeValue!: string;
  genreList!: CodesTableListModel;
  platformList!: CodesTableListModel;

  constructor(
    private gameService: GameService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((id) => {
      this.gameId = id['id'];
    });

    this.getGameDetails();
    this.getExplicitCodeMatureRatingForGame(this.gameDetail?.codeMatureRating);
  }

  getGameDetails() {
    this.gameService.getGamebyId(this.gameId).subscribe((res: any) => {
      this.gameDetail = res;
    });
  }

  seeGameList() {
    this.router.navigate([`game/allGame`]);
  }

  getExplicitCodeMatureRatingForGame(code: string) {
    console.log(`Code Value is: ${code}`);
    this.gameService.getGamebyId(code).subscribe((res: any) => {
      this.matureRatingDecodeValue = res?.decodeValue;
    });
  }
}
