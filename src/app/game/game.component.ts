import { Component, OnInit } from '@angular/core';
import { CaseMorpionComponent } from '../shared/component/case-morpion/case-morpion.component';
import { Player } from './utils/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {


  p1: Player;
  p2: Player;

  cases: Array<CaseMorpionComponent> = [];

  whoPlayed: number = 0;
  whoPlayedName : String = "";
  turnNumber: number = 0;

  gameOver: boolean = false;
  gameResult: number = -1;

  messageResult: String = "";

  constructor() {

    // Initialise les joueurs
    this.p1 = new Player(JSON.parse(localStorage.getItem('player1') || '[]'));
    this.p2 = new Player(JSON.parse(localStorage.getItem('player2') || '[]'));

    // Initialise le jeu
    this.initGame();
  }

  ngOnInit(): void {
  }

  // Initialise la partie
  initGame() {
    // Choisi au hasard le joueur qui commence
    this.whoPlayed = this.randomNumber(1, 2);
    this.changePlayer();

    // Clear les cases
    this.cases = [];

    // Initiliase les cases
    for (let i = 0; i < 9; i++) {
      let caseA = new CaseMorpionComponent();
      caseA.setId(i);
      this.cases.push(caseA);
    }

    // Initialise le nombre de tour
    this.turnNumber = 1;

    // Initialise l'état de la partie
    this.gameOver = false;
  }

  // Change le joueur qui doit jouer
  changePlayer(): number {

    // Échange les joueurs
    if (this.whoPlayed === 1) {
      this.whoPlayed = 2;
      this.whoPlayedName = this.p2.name;
    }
    else {
      this.whoPlayed = 1;
      this.whoPlayedName = this.p1.name;
    }

    return this.whoPlayed;
  }

  // Vérifie si le joueur clique sur une case déjà cliqué ou non
  playerClick(caseClicked: number) {

    if(this.gameOver){
      return;
    }

    if (this.cases[caseClicked].isUse()) {
      return;
    }

    this.cases[caseClicked].setState(this.whoPlayed + "");
    this.turnNumber++;

    // Regarde si la partie est terminé
    this.checkWin();

    this.changePlayer();
  }

  // Vérifie l'état de la partie
  checkWin() {

    // Si 9 tours ont été joué, les joueurs sont égalité
    if (this.turnNumber === 10) {
      this.result(0);
    }

    const c1 = this.cases[0].state;
    const c2 = this.cases[1].state;
    const c3 = this.cases[2].state;
    const c4 = this.cases[3].state;
    const c5 = this.cases[4].state;
    const c6 = this.cases[5].state;
    const c7 = this.cases[6].state;
    const c8 = this.cases[7].state;
    const c9 = this.cases[8].state;

    const cond1 = c1 === this.whoPlayed + "" && c2 === this.whoPlayed + "" && c3 === this.whoPlayed + "";
    const cond2 = c4 === this.whoPlayed + "" && c5 === this.whoPlayed + "" && c6 === this.whoPlayed + "";
    const cond3 = c7 === this.whoPlayed + "" && c8 === this.whoPlayed + "" && c9 === this.whoPlayed + "";
    const cond4 = c1 === this.whoPlayed + "" && c4 === this.whoPlayed + "" && c7 === this.whoPlayed + "";
    const cond5 = c2 === this.whoPlayed + "" && c5 === this.whoPlayed + "" && c8 === this.whoPlayed + "";
    const cond6 = c3 === this.whoPlayed + "" && c6 === this.whoPlayed + "" && c9 === this.whoPlayed + "";
    const cond7 = c1 === this.whoPlayed + "" && c5 === this.whoPlayed + "" && c9 === this.whoPlayed + "";
    const cond8 = c3 === this.whoPlayed + "" && c5 === this.whoPlayed + "" && c7 === this.whoPlayed + "";

    // Si un joueur a gagné
    if (cond1 || cond2 || cond3 || cond4 || cond5 || cond6 || cond7 || cond8) {
      this.result(this.whoPlayed);
    }
  }

  // Modifie l'état des variables indiquant l'état de la partie ainsi que le résultat
  result(value: number) {
    this.gameOver = true;
    this.gameResult = value;

    if(value === 1){
      this.p1.addScore();
      this.p1.saveData("player1");
    }
    else if(value === 2){
      this.p2.addScore();
      this.p2.saveData("player2");
    }

    this.messageResult = this.getResultMessage();
  }

  // Envoie une chaine de caractère affichant le gagant
  getResultMessage(): string {
    if (this.gameOver) {
      if (this.gameResult === 0) {
        return "Égalité !";
      }

      return this.whoPlayedName + " a gagné !";
    }

    return "";
  }

  // Reset le score des joueurs
  resetScores(){
    this.p1.resetScore();
    this.p1.saveData("player1");
    this.p2.resetScore();
    this.p2.saveData("player2");
  }

  // Permet d'avoir un nombre aléatoire
  randomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }

  // Redémarre une partie
  restartGame() {
    this.initGame();
  }
}