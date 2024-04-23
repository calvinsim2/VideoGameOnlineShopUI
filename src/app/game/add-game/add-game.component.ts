import { Component } from '@angular/core';
import { GameService } from '../service/game.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss'],
})
export class AddGameComponent {
  constructor(
    private gameService: GameService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  public gameSubmissionForm!: FormGroup;

  ngOninit() {
    this.gameSubmissionForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      codeMatureRating: ['', Validators.required],
      price: [0, Validators.min(0)],
    });
  }

  seeGameList() {
    this.router.navigate([`game/allGame`]);
  }
}
