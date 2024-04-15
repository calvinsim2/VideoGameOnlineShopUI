import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../service/game.service';

@Component({
  selector: 'app-all-game',
  templateUrl: './all-game.component.html',
  styleUrls: ['./all-game.component.scss'],
})
export class AllGameComponent implements OnInit {
  constructor(private gameService: GameService, private router: Router) {}

  public gameList: any = [];

  ngOnInit(): void {
    this.getAllGames();
  }

  getAllGames() {
    this.gameService.getAllGame().subscribe({
      next: (res) => {
        console.log(res);
        this.gameList = res;
      },
      error: (err) => {
        alert(`An error has occured. Please try again later `);
      },
    });
  }

  viewGame(id: any) {
    this.router.navigate([`game/game/${id}`]);
  }
}
