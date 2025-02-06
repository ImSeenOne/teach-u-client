import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  navItems = [
    { label: 'My Plans' },
    { label: 'Get JSON Structure' },
    { label: 'Add a New Plan' }
  ];
}
