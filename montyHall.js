class Door{
    constructor(number,isCar){
        this.number = number;
        this.isCar = isCar;
        this.opened = false;
    }
}
class Game{
    constructor(switching){
        this.door_1 = new  Door(1,true);
        this.door_2 = new Door(2,false);
        this.door_3 = new Door(3,false);
        this.doors =[this.door_1,this.door_2,this.door_3]
        this.doorPicked = this.doorPicked_();
        this.openedGoatDoor = this.openedGoatDoor_();
        this.finalPick = this.finalPick_(switching)
        this.won = this.won_()
    }
    doorPicked_(){
        let a=Math.floor(Math.random()*3)
        return this.doors[a];
    }
    openedGoatDoor_(){
        let selectedDoor;
        for(let i = 0; i < this.doors.length; ++i) {
            let currentDoor = this.doors[i]
            if(currentDoor.isCar != true && currentDoor != this.doorPicked){
                currentDoor.opened = true
                selectedDoor = currentDoor
                return selectedDoor;
            }
        }
        return selectedDoor;
    }    
    won_(){
        if (this.finalPick.isCar){
            return true
        }else{
            return false
        }
    }
    finalPick_(switching){
        let decision = switching;
        if(decision == "dontSwitch"){
            return this.doorPicked
        }else{
            var result;
            this.doors.forEach(door => {
                if(door != this.doorPicked && door.opened != true) {
                result = door
                } 
            });
            return result
        }
    }
}
class Statistics {
    constructor(){
        this.gamesWithSameDoorWon = [];
        this.gamesWithSameDoorLost = [];
        this.gamesWithDoorChangeWon = [];
        this.gamesWithDoorChangeLost = [];
    }
}
function simulateTheGame(number){
let statistics = new Statistics;
for (let i = 0; i < number; i++){
    let game1 = new Game("Switch");
    let game2 = new Game("dontSwitch");
    if(game1.won){
        statistics.gamesWithDoorChangeWon.push(game1.won);
    }else{
        statistics.gamesWithDoorChangeLost.push(game1.won);
    }
    if(game2.won){
        statistics.gamesWithSameDoorWon.push(game2.won);
    }else{
        statistics.gamesWithSameDoorLost.push(game2.won)
    }
}    
let gameWithDoorChangeWon = (statistics.gamesWithDoorChangeWon.length/number)*100;
let gameWithSameDoorWon = (statistics.gamesWithSameDoorWon.length/number)*100;
console.log(`${gameWithDoorChangeWon.toFixed(2)}% of games were won switching doors`);
console.log(`${gameWithSameDoorWon.toFixed(2)}% of games wre won when not switching doors`);
}
simulateTheGame(100000)


