import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PlanComponent } from './plan/plan.component'; // import the standalone PlanComponent
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {DarkModeToggleComponent} from './dark-mode-toggle/dark-mode-toggle.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PlanComponent, NavBarComponent, DarkModeToggleComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
