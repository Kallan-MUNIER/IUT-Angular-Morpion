import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from '../game/game.component';
import { CaseMorpionComponent } from './component/case-morpion/case-morpion.component';

@NgModule({
  declarations: [
    GameComponent,
    CaseMorpionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CaseMorpionComponent
  ]
})

export class SharedModule { }