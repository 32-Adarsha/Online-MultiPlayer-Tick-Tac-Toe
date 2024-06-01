import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TickLogicService {
  constructor() {}

  winConditions = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal from top-left
    [2, 4, 6], // diagonal from top-right
  ];

  checkWin(gameGrid: any) {
    for (const condition of this.winConditions) {
      const [a, b, c] = condition;
      if (
        gameGrid[a].item &&
        gameGrid[a].item === gameGrid[b].item &&
        gameGrid[a].item === gameGrid[c].item
      ) {
        return gameGrid[a].item;
      }
    }
    return null;
  }

  checkGameStatus(gameGrid: any, totalMove: number) {
    const winner = this.checkWin(gameGrid);

    if (winner) {
      return winner;
    } else if (totalMove == 9) {
      return "Draw";
    } else {
      return "Progress";
    }
  }
}
