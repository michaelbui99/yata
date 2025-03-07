import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidemenuComponent} from './components/sidemenu/sidemenu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidemenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'YATA';
}
