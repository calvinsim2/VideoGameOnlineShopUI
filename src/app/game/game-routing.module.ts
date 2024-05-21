import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game.component';
import { AllGameComponent } from './all-game/all-game.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { AddGameComponent } from './add-game/add-game.component';
import { DeveloperComponent } from './developer/developer.component';
import { UpdateGameComponent } from './update-game/update-game.component';

const routes: Routes = [
  {
    path: '',
    component: GameComponent,
    children: [
      { path: '', redirectTo: 'allGame', pathMatch: 'full' },
      { path: 'allGame', component: AllGameComponent },
      { path: 'game/:id', component: GameDetailComponent },
      { path: 'game/update/:id', component: UpdateGameComponent },
      { path: 'addGame', component: AddGameComponent },
      { path: 'allDeveloper', component: DeveloperComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
