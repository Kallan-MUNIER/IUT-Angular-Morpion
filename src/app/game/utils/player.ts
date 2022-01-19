export class Player {

    score: number = 0;
    name: string = "Invité";

    // Constructeur principal
    constructor(values: any) {
        console.log(values);

        if(values.length === 0){
            return;
        }
        
        this.score = values["score"];
        this.name = values["name"];
    }

    // Ajout 1 de score
    addScore(){
        this.score++;
    }

    // Sauvegarde les données
    saveData(path: string){
        let value = {
            name : this.name,
            score : this.score
        }
    
        localStorage.setItem(path, JSON.stringify(value));
    }

    // Reset le score
    resetScore(){
        this.score = 0;
    }
}