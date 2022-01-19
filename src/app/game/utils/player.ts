export class Player {
    score;
    email;
    name;

    // Constructeur principal
    constructor(score: number, email: string, name: string) {
        this.score = score;
        this.email = email;
        this.name = name;
    }

    // Ajout 1 de score
    addScore(){
        this.score++;
    }
}