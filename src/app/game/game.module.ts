import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';
import { AllGameComponent } from './all-game/all-game.component';
import { GameDetailComponent } from './game-detail/game-detail.component';

@NgModule({
  declarations: [GameComponent, AllGameComponent, GameDetailComponent],
  imports: [CommonModule, GameRoutingModule],
})
export class GameModule {}
