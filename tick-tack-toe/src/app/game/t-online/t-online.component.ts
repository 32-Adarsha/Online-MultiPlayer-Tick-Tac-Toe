import { ChangeDetectorRef, Component } from "@angular/core";
import { DataServiceService } from "../../data/data-service.service";
import { ChatService } from "../../chat.service";
import { skip } from "rxjs";
import { TickLogicService } from "../../tick-logic.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-t-online",
  standalone: true,
  imports: [],
  templateUrl: "./t-online.component.html",
  styleUrl: "./t-online.component.css",
})
export class TOnlineComponent {
  turn = 0;
  gameInfo: any;
  userId: any;
  gameId: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private dService: DataServiceService,
    private chatService: ChatService,
    private tService: TickLogicService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.chatService
      .getGameUpdate()
      .pipe(skip(1))
      .subscribe((message: any) => {
        this.gameInfo = message;
        if (message.status == "Finished") {
          if (message.result == "Won") {
            if (message.winner == message.player1) {
              alert("Player 1 Won The Game");
            } else {
              alert("Player 1 Won The Game");
            }
            setTimeout(() => {
              this.router.navigate(["/"]);
            }, 9000);
          } else {
            alert("The Game is a Draw");
            setTimeout(() => {
              this.router.navigate(["/"]);
            }, 9000);
          }
        }
      });

    this.gameInfo = this.dService.gameData.gameInfo;
    this.userId = this.dService.gameData.yourId;
    this.gameId = this.dService.gameData.id;
  }

  onMouseClick(id: any) {
    if (
      this.gameInfo.status === "Progress" &&
      this.gameInfo.turn === this.userId
    ) {
      this.gameInfo.gameData.forEach((element: any) => {
        if (element.id === id) {
          if (this.gameInfo.turn === this.gameInfo.player1) {
            if (element.icon_link == "") {
              element.icon_link = "assets/oNeo.svg";
              element.item = "o";
              this.gameInfo.turn = this.gameInfo.player2;
              this.gameInfo.totalMove += 1;
            }
          } else {
            if (element.icon_link == "") {
              element.icon_link = "assets/xNeo.svg";
              element.item = "x";
              this.gameInfo.turn = this.gameInfo.player1;
              this.gameInfo.totalMove += 1;
            }
          }
        }
      });
      console.log(this.gameInfo.totalMove);
      var result = this.tService.checkGameStatus(
        this.gameInfo.gameData,
        this.gameInfo.totalMove,
      );
      if (result == "o") {
        this.gameInfo.status = "Finished";
        this.gameInfo.result = "Won";
        this.gameInfo.winner = this.gameInfo.player1;
      } else if (result == "x") {
        this.gameInfo.status = "Finished";
        this.gameInfo.result = "Won";
        this.gameInfo.winner = this.gameInfo.player2;
      } else if (result == "Draw") {
        this.gameInfo.status = "Finished";
        this.gameInfo.result = "Draw";
        this.gameInfo.winner = "";
      }
      this.chatService.sendGameMessage(this.gameId, this.gameInfo);
      this.cdr.detectChanges();
    }
  }
}
