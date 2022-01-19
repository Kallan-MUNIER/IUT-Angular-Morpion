import { Component, OnInit } from '@angular/core';
import { Player } from '../game/utils/player';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  p1: Player;
  p2: Player;
  
  constructor() { 
    this.p1 = new Player(JSON.parse(localStorage.getItem('player1') || '[]'));
    this.p2 = new Player(JSON.parse(localStorage.getItem('player2') || '[]'));
  }

  ngOnInit(): void {
  }

}
