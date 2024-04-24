import { Component } from '@angular/core';
import { GameService } from '../service/game.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeveloperService } from '../service/developer.service';
import { take } from 'rxjs';
import { DeveloperModel } from '../model/developer.model';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss'],
})
export class AddGameComponent {
  constructor(
    private gameService: GameService,
    private developerService: DeveloperService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  public gameSubmissionForm!: FormGroup;
  public developerList: DeveloperModel[] = [];

  ngOninit() {
    this.gameSubmissionForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      codeMatureRating: ['', Validators.required],
      price: [0, Validators.min(0)],
    });
  }

  getAllDevelopers() {
    this.developerService.getAllDeveloper().pipe(take(1)).subscribe({
      next: (res) => {
        this.developerList = res;
        console.log(this.developerList)
      },
      error: (err) => {
        alert(`An error has occured. Please try again later `);
      },
    }
      
    )
  }

  seeGameList() {
    this.router.navigate([`game/allGame`]);
  }
}
