import { Routes } from "@angular/router";

import { TickTackToeComponent } from "./game/tick-tack-toe/tick-tack-toe.component";
import { HomeComponent } from "./home/home.component";
import { TOnlineComponent } from "./game/t-online/t-online.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: "Home",
  },
  {
    path: "games",
    component: TickTackToeComponent,
    title: "TickTackToe",
  },
  {
    path: "onlineGame",
    component: TOnlineComponent,
    title: "Online TickTackToe",
  },
];
