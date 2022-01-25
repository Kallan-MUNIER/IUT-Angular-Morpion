import { Component, OnInit } from '@angular/core';
import { Player } from '../game/utils/player';
import { CaseMorpionComponent } from '../shared/component/case-morpion/case-morpion.component';

@Component({
  selector: 'app-puissance4',
  templateUrl: './puissance4.component.html',
  styleUrls: ['./puissance4.component.scss']
})
export class Puissance4Component implements OnInit {

  p1: Player;
  p2: Player;

  cases: Array<Array<CaseMorpionComponent>> = [];
  allCases: Array<CaseMorpionComponent> = []

  lastClick: Array<number> = [];

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

  initGame() {

    // Choisi au hasard le joueur qui commence
    this.whoPlayed = this.randomNumber(1, 2);
    this.changePlayer();

    // Clear les cases
    this.cases = [];
    this.allCases = [];

    // Initiliase les cases
    for(let x = 0; x < 7; x++){
      let colCases:CaseMorpionComponent[]  = new Array<CaseMorpionComponent>();
      for (let y = 0; y < 6; y++) {
        let caseA = new CaseMorpionComponent();
        caseA.setId(x);
        colCases.push(caseA);
      }
      this.cases.push(colCases);
    }

    for(let y = 0; y < 6; y++){
      for(let x = 0; x < 7; x++){
        this.allCases.push(this.cases[x][y]);
      }
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
    
    caseClicked = caseClicked % 7;

    if(this.gameOver){
      return;
    }

    if (this.cases[caseClicked][0].isUse()) {
      return;
    }

    for(let i = 5; i > -1; i--){
      if(!this.cases[caseClicked][i].isUse()){
        this.cases[caseClicked][i].setState(this.whoPlayed + "");
        this.lastClick = [caseClicked, i];
        this.turnNumber++;

        this.checkWin();

        this.changePlayer();
        return;
      }
    }
  }

  checkWin() {
    // Check les lignes droites
    // Horizontal
    let max = 0;
    let current = 0;

    for(let x = 0; x < 7; x++){
      if(this.cases[x][this.lastClick[1]].state == this.whoPlayed + ""){
        current++;
        if(max < current) max = current;
      }
      else{
        current = 0;
      }
    }

    if(max > 3){
      this.result(this.whoPlayed);
      return;
    }

    current = 0;
    max = 0;

    // Vertical
    for(let y = 0; y < 6; y++){
      if(this.cases[this.lastClick[0]][y].state == this.whoPlayed + ""){
        current++;
        if(max < current) max = current;
      }
      else{
        current = 0;
      }
    }

    if(max > 3){
      this.result(this.whoPlayed);
      return;
    }

    current = 0;
    max = 0;

    // Vérifie les diagonale
    // Gauche vers la droite
    let y = - this.lastClick[0] + (5-this.lastClick[1]) - 1;

    for(let x = 0; x < 7; x++){
      y++;
      let realY = 5-y;
      if(realY < 6 && realY > -1){
        if(this.cases[x][realY].state == this.whoPlayed + ""){
          current++;
          if(max < current) max = current;
        }
        else{
          current = 0;
        }
      }
    }

    if(max > 3){
      this.result(this.whoPlayed);
      return;
    }

    current = 0;
    max = 0;

    // droite vers la gauche
    y = - this.lastClick[0] + (5-this.lastClick[1]) - 1;
    y = -y;
    y = y + ((5-this.lastClick[1])*2);
    for(let x = 0; x < 7; x++){
      y--;
      let realY = 5-y;
      if(realY < 6 && realY > -1){
        if(this.cases[x][realY].state == this.whoPlayed + ""){
          current++;
          if(max < current) max = current;
        }
        else{
          current = 0;
        }
      }
    }

    console.log(max);

    if(max > 3){
      this.result(this.whoPlayed);
      return;
    }
  }

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
