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
    let player1 = JSON.parse(localStorage.getItem('player1') || '[]');
    let player2 = JSON.parse(localStorage.getItem('player2') || '[]');

    this.p1 = new Player(player1[0]["score"], player1[0]["email"], player1[0]["nom"]);
    this.p2 = new Player(player2[0]["score"], player2[0]["email"], player2[0]["nom"]);
  }

  ngOnInit(): void {
  }

}
