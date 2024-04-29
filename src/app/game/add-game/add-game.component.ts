import { Component } from '@angular/core';
import { GameService } from '../service/game.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DeveloperService } from '../service/developer.service';
import { take } from 'rxjs';
import { DeveloperModel } from '../model/developer.model';
import { CodesTableService } from '../service/codes-table.service';
import { CodesTableModel } from '../model/codesTable.model';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss'],
})
export class AddGameComponent {
  constructor(
    private gameService: GameService,
    private developerService: DeveloperService,
    private codesTableService: CodesTableService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  public gameSubmissionForm!: FormGroup;
  public codesTableGenreSubmissionForm!: FormGroup;
  public codesTablePlatformSubmissionForm!: FormGroup;
  public developerList: DeveloperModel[] = [];
  public codeMatureRatingList: CodesTableModel[] = [];
  public codeGenreList: CodesTableModel[] = [];
  public codePlatformList: CodesTableModel[] = [];

  ngOnInit() {
    this.gameSubmissionForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      codeMatureRating: ['', Validators.required],
      concatenatedCodeGenre: ['', Validators.required],
      concatenatedCodePlatform: ['', Validators.required],
      price: [0, Validators.min(0)],
      developerId: [
        this.developerList.length > 0 ? this.developerList[0].name : '',
        Validators.required,
      ],
    });

    this.codesTableGenreSubmissionForm = this.formBuilder.group({});
    this.codesTablePlatformSubmissionForm = this.formBuilder.group({});

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
            this.codesTableGenreSubmissionForm
          );
        },
        error: (err) => {
          alert(`An error has occured. Please try again later `);
        },
      });
  }

  updateConcatenatedCodeGenre() {
    let selectedCodeGenres: string = this.filterSelectedCodesTableToString(
      this.codesTableGenreSubmissionForm.value
    );

    this.gameSubmissionForm.patchValue({
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
            this.codesTablePlatformSubmissionForm
          );
        },
        error: (err) => {
          alert(`An error has occured. Please try again later `);
        },
      });
  }

  updateConcatenatedCodePlatform() {
    let selectedCodePlatforms: string = this.filterSelectedCodesTableToString(
      this.codesTablePlatformSubmissionForm.value
    );

    this.gameSubmissionForm.patchValue({
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

  submitGame() {
    console.log(this.gameSubmissionForm.value);
  }
  seeGameList() {
    this.router.navigate([`game/allGame`]);
  }
}
