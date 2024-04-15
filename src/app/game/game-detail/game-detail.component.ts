import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../service/game.service';
import { ActivatedRoute } from '@angular/router';
import { GameModel } from '../model/game.model';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent {
  gameId!: string;
  gameDetail!: GameModel;

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
    this.gameService.getGamebyId(this.gameId).subscribe((res: any) => {
      console.log(res);
      this.gameDetail = res;
    });
  }

  seeGameList() {
    this.router.navigate([`game/allGame`]);
  }
}
