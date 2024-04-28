import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../service/game.service';
import { GameModel } from '../model/game.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-all-game',
  templateUrl: './all-game.component.html',
  styleUrls: ['./all-game.component.scss'],
})
export class AllGameComponent implements OnInit {
  constructor(private gameService: GameService, private router: Router) {}

  public gameList: GameModel[] = [];

  ngOnInit(): void {
    this.getAllGames();
  }

  getAllGames() {
    this.gameService.getAllGame().pipe(take(1)).subscribe({
      next: (res) => {
        this.gameList = res;
      },
      error: (err) => {
        alert(`An error has occured. Please try again later `);
      },
    });
  }

  viewGame(id: string) {
    this.router.navigate([`game/game/${id}`]);
  }
}
