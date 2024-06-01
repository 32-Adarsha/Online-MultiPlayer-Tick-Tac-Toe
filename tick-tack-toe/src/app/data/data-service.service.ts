import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataServiceService {
  public gameData: any | boolean = false;
  constructor() {}

  public getGameData(): any | boolean {
    return this.gameData;
  }
  public setGameData(gameData: any): void {
    this.gameData = gameData;
  }
}
