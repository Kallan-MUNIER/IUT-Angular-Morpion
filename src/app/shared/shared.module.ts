import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from '../game/game.component';
import { CaseMorpionComponent } from './component/case-morpion/case-morpion.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    GameComponent,
    CaseMorpionComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule
  ],
  exports: [
    CaseMorpionComponent
  ]
})

export class SharedModule { }