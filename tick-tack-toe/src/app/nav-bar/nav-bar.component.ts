import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
    owner = "Adarsha";
    nav_link = [
      {id:1 , name:"Home"},
      {id:2 , name:"Stat"},
      {id:3,  name:"Online"},
    ];

}
