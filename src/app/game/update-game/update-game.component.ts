import { Component } from '@angular/core';
import { GameModel } from '../model/game.model';
import { CodesTableModel } from '../model/codesTable.model';
import { GameService } from '../service/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CodesTableService } from '../service/codes-table.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DeveloperModel } from '../model/developer.model';
import { take } from 'rxjs';
import { DeveloperService } from '../service/developer.service';

@Component({
  selector: 'app-update-game',
  templateUrl: './update-game.component.html',
  styleUrls: ['./update-game.component.scss'],
})
export class UpdateGameComponent {
  gameId!: string;
  currentGameDetail!: GameModel;
  currentGameMatureRating!: CodesTableModel;
  currentGameMatureRatingDecodeValue!: string;
  currentGameGenreList: CodesTableModel[] = [];
  currentGameGenres!: string;
  currentGamePlatformList: CodesTableModel[] = [];
  currentGamePlatform!: string;
  hasDataLoaded: boolean = false;
  // forms related
  public gameUpdateForm!: FormGroup;
  public codesTableGenreUpdateForm!: FormGroup;
  public codesTablePlatformUpdateForm!: FormGroup;
  public developerList: DeveloperModel[] = [];
  public codeMatureRatingList: CodesTableModel[] = [];
  public codeGenreList: CodesTableModel[] = [];
  public codePlatformList: CodesTableModel[] = [];

  constructor(
    private gameService: GameService,
    private developerService: DeveloperService,
    private codesTableService: CodesTableService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((id) => {
      this.gameId = id['id'];
    });

    this.gameUpdateForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageurl: [''],
      codeMatureRating: ['', Validators.required],
      concatenatedCodeGenre: ['', Validators.required],
      concatenatedCodePlatform: ['', Validators.required],
      price: [0, Validators.min(0)],
      developerId: ['', Validators.required],
    });

    this.codesTableGenreUpdateForm = this.formBuilder.group({});
    this.codesTablePlatformUpdateForm = this.formBuilder.group({});

    this.getAllRequiredData();
  }

  getAllRequiredData() {
    this.getAllDevelopers();
    this.getAllCodeMatureRating();
    this.getAllCodeGenre();
    this.getAllCodePlatform();
  }

  getAllDevelopers() {
    this.developerService
      .getAllDeveloper()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.developerList = res;
        },
        error: (err) => {
          alert(`An error has occured. Please try again later `);
        },
      });
  }

  getAllCodeMatureRating() {
    this.codesTableService
      .getAllCodeMatureRating()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.codeMatureRatingList = res;
        },
        error: (err) => {
          alert(`An error has occured. Please try again later `);
        },
      });
  }

  // ========== CodeGenre ===================================
  getAllCodeGenre() {
    this.codesTableService
      .getAllCodeGenre()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.codeGenreList = res;
          this.addCodesTableParametersIntoFormBuilder(
            this.codeGenreList,
            this.codesTableGenreUpdateForm
          );
        },
        error: (err) => {
          console.log(err);
          alert(`An error has occured. Please try again later `);
        },
      });
  }

  updateConcatenatedCodeGenre() {
    let selectedCodeGenres: string = this.filterSelectedCodesTableToString(
      this.codesTableGenreUpdateForm.value
    );

    this.gameUpdateForm.patchValue({
      concatenatedCodeGenre: selectedCodeGenres,
    });
  }

  // ========== CodePlatform ===================================
  getAllCodePlatform() {
    this.codesTableService
      .getAllCodePlatform()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.codePlatformList = res;
          this.addCodesTableParametersIntoFormBuilder(
            this.codePlatformList,
            this.codesTablePlatformUpdateForm
          );
        },
        error: (err) => {
          alert(`An error has occured. Please try again later `);
        },
      });
  }

  updateConcatenatedCodePlatform() {
    let selectedCodePlatforms: string = this.filterSelectedCodesTableToString(
      this.codesTablePlatformUpdateForm.value
    );

    this.gameUpdateForm.patchValue({
      concatenatedCodePlatform: selectedCodePlatforms,
    });
  }

  // ---------- Common Methods -------------------------------
  filterSelectedCodesTableToString(codes: object) {
    let selectedCodeTableList: string[] = [];

    for (const [option, isChecked] of Object.entries(codes)) {
      if (isChecked) {
        selectedCodeTableList.push(option);
      }
    }

    return selectedCodeTableList.toString();
  }

  addCodesTableParametersIntoFormBuilder(
    codeGenreList: CodesTableModel[],
    codesTableFormGroup: FormGroup
  ) {
    codeGenreList.forEach((codeGenre) => {
      codesTableFormGroup.addControl(codeGenre.code, new FormControl(false));
    });
  }

  updateGame() {
    console.log(this.gameUpdateForm.value);

    if (this.gameUpdateForm.valid) {
      this.gameService.updateGame(this.gameUpdateForm.value).subscribe({
        next: () => {
          alert(`Game Updated successfully! `);
          document.getElementById('close-add-developer')?.click();
          this.router.navigate([`game/allGame`]);
        },
        error: (err) => {
          console.log(err);
          alert(`${err.error}`);
        },
      });
    } else {
      alert(`An error has occured. Check input values and try again`);
    }
  }
}
