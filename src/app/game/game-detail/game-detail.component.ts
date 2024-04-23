import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../service/game.service';
import { ActivatedRoute } from '@angular/router';
import { GameModel } from '../model/game.model';
import { CodesTableModel } from '../model/codesTable.model';
import { switchMap, take } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

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

          // Process mature rating
          const codeMatureRating: string = data.codeMatureRating;
          const matureRating$ =
            this.gameService.getExplicitCodeMatureRating(codeMatureRating);

          // Process genres
          const codeGenres: string = data.codeGenre;
          const genres$ = this.gameService.getSelectedCodeGenre(codeGenres);

          // Process platform
          const codePlatform: string = data.codePlatform;
          const platform$ =
            this.gameService.getSelectedCodePlatform(codePlatform);

          // Combining all observables
          return forkJoin([matureRating$, genres$, platform$]);
        })
      )
      .subscribe(
        ([matureRating, genres, platform]: [
          CodesTableModel,
          CodesTableModel[],
          CodesTableModel[]
        ]) => {
          this.matureRatingDecodeValue = matureRating.decodeValue;

          this.genreList = genres;
          this.genres = this.extractListToDecodeValues(this.genreList);

          this.platformList = platform;
          this.platform = this.extractListToDecodeValues(this.platformList);
        }
      );
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
