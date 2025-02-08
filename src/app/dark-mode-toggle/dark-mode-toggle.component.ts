import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dark-mode-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.scss']
})
export class DarkModeToggleComponent implements OnInit {
  darkModeOn = false;

  ngOnInit() {
    // Revisar si estaba en modo oscuro antes de cargar el componente
    const saved = localStorage.getItem('darkModeOn');
    const wasDark = saved === 'true'; //true si el string es "true"
    if (wasDark) {
      this.darkModeOn = true;
      document.body.classList.add('dark-mode');
    }
  }

  toggleDarkMode() {
    this.darkModeOn = !this.darkModeOn;
    localStorage.setItem('darkModeOn', this.darkModeOn.toString());
    document.body.classList.toggle('dark-mode', this.darkModeOn);
  }
}
