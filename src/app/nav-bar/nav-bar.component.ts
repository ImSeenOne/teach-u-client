import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    { label: 'Add A New Plan' }
  ];

  onMyPlans() {
    alert('MY PLANS');
  }

  copyBaseJsonStructure() {
    const baseStructure = {
      planTitle: 'Your Plan Title',
      sections: [
        {
          id: 'example-section',
          title: 'Section Title',
          topics: [
            {
              title: 'Topic Title',
              subtopics: [
                {
                  title: 'Subtopic Title',
                  content: {
                    explanation: 'A short explanation.',
                    resources: {},
                    activities: []
                  }
                }
              ]
            }
          ]
        }
      ]
    };

    const text = JSON.stringify(baseStructure, null, 2);
    navigator.clipboard.writeText(text)
      .then(() => alert('Base JSON copiada al portapapeles.'))
      .catch(err => console.error('Error copiando JSON:', err));
  }

  onAddNewPlan() {
    alert('ADD NEW PLAN');
  }
}
