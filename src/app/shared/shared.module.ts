import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from '../game/game.component';
import { CaseMorpionComponent } from './component/case-morpion/case-morpion.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { Puissance4Component } from '../puissance4/puissance4.component';

@NgModule({
  declarations: [
    GameComponent,
    Puissance4Component,
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