import { Component } from "@angular/core";
import { Router, RouterLink, RouterModule } from "@angular/router";
import { ChatService } from "../chat.service";
import { DataServiceService } from "../data/data-service.service";
import { skip } from "rxjs";

@Component({
  selector: "app-body",
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: "./body.component.html",
  styleUrl: "./body.component.css",
})
export class BodyComponent {
  constructor(
    private chatService: ChatService,
    private router: Router,
    private dService: DataServiceService,
  ) {}
  ngOnInit() {
    this.chatService
      .joinGame()
      .pipe(skip(1))
      .subscribe((message: any) => {
        this.dService.setGameData(message);
        this.router.navigate(["/onlineGame"]);
      });
      
  }

  plOnline() {
    this.chatService.playOnline();
    console.log("PlayingOnline");
  }
}
