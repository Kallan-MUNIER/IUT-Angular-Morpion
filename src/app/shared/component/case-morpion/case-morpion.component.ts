import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-morpion',
  templateUrl: './case-morpion.component.html',
  styleUrls: ['./case-morpion.component.scss']
})

export class CaseMorpionComponent implements OnInit {

    // X -> Aucun
    // 1 -> Joueur 1
    // 2 -> Joueur 2
    
    @Input() case: any;

    state: String;
    id: number = -1;

    constructor() {
        this.state = "X";
    }

    setId(id: number){
      this.id = id;
    }

    setState(value: string){
      this.state = value;
    }

    isUse() : boolean{
      return this.state != "X";
    }

  ngOnInit(): void {
  }
}
