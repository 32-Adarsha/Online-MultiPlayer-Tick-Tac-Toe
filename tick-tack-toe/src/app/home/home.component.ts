import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { BodyComponent } from '../body/body.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent,BodyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
