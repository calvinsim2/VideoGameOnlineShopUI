import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../service/game.service';
import { ActivatedRoute } from '@angular/router';
import { GameModel } from '../model/game.model';
import { CodesTableModel } from '../model/codesTable.model';
import { switchMap, take } from 'rxjs/operators';

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
  genreList: CodesTableModel[] = [];
  genres!: string;
  platformList: CodesTableModel[] = [];
  platform!: string;

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
  }

  getGameDetails() {
    this.gameService
      .getGamebyId(this.gameId)
      .pipe(
        take(1),
        switchMap((data: GameModel) => {
          this.gameDetail = data;
          const codeMatureRating: string = data.codeMatureRating;

          return this.gameService.getExplicitCodeMatureRating(codeMatureRating);
        })
      )
      .pipe(take(1))
      .subscribe((res: CodesTableModel) => {
        this.matureRatingDecodeValue = res.decodeValue;
      });

    this.gameService
      .getGamebyId(this.gameId)
      .pipe(
        take(1),
        switchMap((data: GameModel) => {
          const codeGenres: string = data.codeGenre;

          return this.gameService.getSelectedCodeGenre(codeGenres);
        })
      )
      .pipe(take(1))
      .subscribe((res: CodesTableModel[]) => {
        this.genreList = res;
        this.genres = this.extractListToDecodeValues(this.genreList);
      });

    this.gameService
      .getGamebyId(this.gameId)
      .pipe(
        take(1),
        switchMap((data: GameModel) => {
          const codePlatform: string = data.codePlatform;

          return this.gameService.getSelectedCodePlatform(codePlatform);
        })
      )
      .pipe(take(1))
      .subscribe((res: CodesTableModel[]) => {
        this.platformList = res;
        this.platform = this.extractListToDecodeValues(this.platformList);
      });
  }

  seeGameList() {
    this.router.navigate([`game/allGame`]);
  }

  extractListToDecodeValues(codeTables: CodesTableModel[]) {
    let decodeValuesList: string[] = [];
    let decodeValues: string = '';

    codeTables.forEach((ct) => decodeValuesList.push(ct.decodeValue));
    decodeValues = decodeValuesList.toString();

    return decodeValues;
  }
}
