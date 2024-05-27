import { ChangeDetectorRef, Component } from '@angular/core';


enum GameStatus {
  Finished,
  Progressing,
}

@Component({
  selector: 'app-tick-tack-toe',
  standalone: true,
  imports: [],
  templateUrl: './tick-tack-toe.component.html',
  styleUrl: './tick-tack-toe.component.css'
})
export class TickTackToeComponent {

  constructor(private cdr:ChangeDetectorRef){}
  turn = 0;
  gameStatus:GameStatus = GameStatus.Progressing;

  gameGrid = [
    {
      id:1,
      class:"bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
      icon_link:"",
      item:""
    },
    {
      id:2,
      class:"bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
      icon_link:"",
      item:""
    },
    {
      id:3,
      class:"bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
      icon_link:"",
      item:""
    },
    {
      id:4,
      class:"bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
      icon_link:"",
      item:""
    },
    {
      id:5,
      class:"bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
      icon_link:"",
      item:""
    },
    {
      id:6,
      class:"bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
      icon_link:"",
      item:""
    },
    {
      id:7,
      class:"bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
      icon_link:"",
      item:""
    },
    {
      id:8,
      class:"bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
      icon_link:"",
      item:""
    },
    {
      id:9,
      class:"bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
      icon_link:"",
      item:""
    },
  ]
  winConditions = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal from top-left
    [2, 4, 6]  // diagonal from top-right
];

checkWin() {
  for (const condition of this.winConditions) {
      const [a, b, c] = condition;
      if (
          this.gameGrid[a].item &&
          this.gameGrid[a].item === this.gameGrid[b].item &&
          this.gameGrid[a].item === this.gameGrid[c].item
      ) {
          return this.gameGrid[a].item;
      }
  }
  return null;
}
checkGameStatus() {
  const winner = this.checkWin();
  if (winner) {
      this.showWinner(winner);
  }
}

 

  showWinner(player: String){
    this.gameStatus = GameStatus.Finished;
    setTimeout(() => {
        if (player == "x"){
            alert("The Winner is Player 2");
        } else {
            alert("The Winner is Player 1");
        }
    }, 100);
}
  

  onMouseClick(id:number){
    if (this.gameStatus == GameStatus.Progressing){
    this.gameGrid.forEach(element => {
      if(element.id === id){
        if(this.turn === 0){
          if (element.icon_link == ""){
            element.icon_link = "assets/oNeo.svg";
            element.item = "o";
            this.turn = 1;
          }
        
        } else {
          if (element.icon_link == ""){
            element.icon_link = "assets/xNeo.svg";
            element.item = "x";
            this.turn = 0;
          }
          
          
        }
      }
    });
    this.checkGameStatus();
    this.cdr.detectChanges();
  }

    
  }

}
