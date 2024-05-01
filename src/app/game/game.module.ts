import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';
import { AllGameComponent } from './all-game/all-game.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { AddGameComponent } from './add-game/add-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeveloperComponent } from './developer/developer.component';

@NgModule({
  declarations: [
    GameComponent,
    AllGameComponent,
    GameDetailComponent,
    AddGameComponent,
    DeveloperComponent,
  ],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, GameRoutingModule],
})
export class GameModule {}
