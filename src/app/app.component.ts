import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {HomepageComponent} from "./homepage/homepage.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'figmaballs';

}


