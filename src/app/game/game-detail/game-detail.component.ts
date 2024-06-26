import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../service/game.service';
import { ActivatedRoute } from '@angular/router';
import { GameModel } from '../model/game.model';
import { CodesTableModel } from '../model/codesTable.model';
import { switchMap, take } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { CodesTableService } from '../service/codes-table.service';

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
  hasDataLoaded: boolean = false;

  constructor(
    private gameService: GameService,
    private codesTableService: CodesTableService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((id) => {
      this.gameId = id['id'];
    });

    this.getGameDetails();
  }

  onClose() {}

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
            this.codesTableService.getExplicitCodeMatureRating(
              codeMatureRating
            );

          // Process genres
          const codeGenres: string = data.codeGenre;
          const genres$ =
            this.codesTableService.getSelectedCodeGenre(codeGenres);

          // Process platform
          const codePlatform: string = data.codePlatform;
          const platform$ =
            this.codesTableService.getSelectedCodePlatform(codePlatform);

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
          this.hasDataLoaded = true;
        }
      );
  }

  seeGameList() {
    this.router.navigate([`game/allGame`]);
  }

  navigateToEditGame(id: string) {
    this.router.navigate([`game/game/update/${id}`]);
  }

  deleteGame(id: string) {
    this.gameService.deleteGame(id).subscribe({
      next: (res) => {
        document.getElementById('close-delete-game')?.click();
        alert(`Game has been successfully deleted!`);
        this.router.navigate([`game/allGame`]);
      },
      error: (err) => {
        alert(`${err.error}`);
      },
    });
  }

  extractListToDecodeValues(codeTables: CodesTableModel[]) {
    let decodeValuesList: string[] = [];
    let decodeValues: string = '';

    codeTables.forEach((ct) => decodeValuesList.push(ct.decodeValue));
    decodeValues = decodeValuesList.toString();

    return decodeValues;
  }
}
