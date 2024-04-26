import { Component } from '@angular/core';
import { GameService } from '../service/game.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public developerList: DeveloperModel[] = [];
  public codeMatureRatingList: CodesTableModel[] = [];
  public codeGenreList: CodesTableModel[] = [];
  public codePlatformList: CodesTableModel[] = [];
  public isGenreListPopulated: boolean = false;

  ngOnInit() {
    this.getAllRequiredData()
    // addControl 
    // new mapped array, 
    this.gameSubmissionForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      codeMatureRating: ['', Validators.required],
      concaetenatedCodeGenre: ['', Validators.required],
      price: [0, Validators.min(0)],
      developerId: [this.developerList.length > 0 ? this.developerList[0].name : '', Validators.required],
    });

  }

  getAllRequiredData() {
    this.getAllDevelopers()
    this.getAllCodeMatureRating()
    this.getAllCodeGenre()
    this.getAllCodePlatform()
  }

  getAllDevelopers() {
    this.developerService.getAllDeveloper().pipe(take(1)).subscribe({
      next: (res) => {
        this.developerList = res;
      },
      error: (err) => {
        alert(`An error has occured. Please try again later `);
      },
    }
      
    )
  }

  getAllCodeMatureRating() {
    this.codesTableService.getAllCodeMatureRating().pipe(take(1)).subscribe({
      next: (res) => {
        this.codeMatureRatingList = res;
      },
      error: (err) => {
        alert(`An error has occured. Please try again later `);
      },
    })
  }

  getAllCodeGenre() {
    this.codesTableService.getAllCodeGenre().pipe(take(1)).subscribe({
      next: (res) => {
        this.codeGenreList = res;
        this.isGenreListPopulated = true;
      },
      error: (err) => {
        alert(`An error has occured. Please try again later `);
      },
    })
  }

  getAllCodePlatform() {
    this.codesTableService.getAllCodePlatform().pipe(take(1)).subscribe({
      next: (res) => {
        this.codePlatformList = res;
      },
      error: (err) => {
        alert(`An error has occured. Please try again later `);
      },
    })
  }

  updateConcatenatedCodeGenre() {
    console.log(this.gameSubmissionForm)
    const selectedCodeGenres = this.codeGenreList.filter(cg => this.gameSubmissionForm.get(cg.code))
      
    console.log(selectedCodeGenres.length)

  }

  submitGame() {
    console.log(this.gameSubmissionForm.value)
  }
  seeGameList() {
    this.router.navigate([`game/allGame`]);
  }
}
