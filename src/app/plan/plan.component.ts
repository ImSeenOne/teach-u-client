import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudyPlanService, StudyPlan } from './study-plan.service';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  studyPlan!: StudyPlan;

  openedSections: boolean[] = [];
  sectionProgress: { checked: number; total: number }[] = [];

  constructor(private studyPlanService: StudyPlanService) {}

  ngOnInit(): void {
    // 1) Cargamos plan desde el servicio
    this.studyPlan = this.studyPlanService.getPlan();

    // 2) Expandido/cerrado por defecto
    this.openedSections = this.studyPlan.sections.map(() => false);

    // 3) Contadores de progreso
    this.sectionProgress = this.studyPlan.sections.map(() => ({ checked: 0, total: 0 }));

    // 4) Contamos subtemas
    this.studyPlan.sections.forEach((section, i) => {
      let total = 0;
      section.topics.forEach(topic => total += topic.subtopics.length);
      this.sectionProgress[i].total = total;
    });

    // 5) Cargar checks previos
    this.loadStateFromLocalStorage();

    // 6) Actualizar barra de progreso
    this.updateAllSectionProgress();
  }

  toggleSection(sectionIndex: number) {
    this.openedSections[sectionIndex] = !this.openedSections[sectionIndex];
    this.saveStateToLocalStorage();
  }

  onSectionCheckboxChange(sectionIndex: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;

    const section = this.studyPlan.sections[sectionIndex];
    section.topics.forEach((topic, tIndex) => {
      topic.subtopics.forEach((_, sIndex) => {
        this.setSubtopicChecked(sectionIndex, tIndex, sIndex, checked);
      });
    });

    this.updateSectionProgress(sectionIndex);
    this.saveStateToLocalStorage();
  }

  onTopicCheckboxChange(sectionIndex: number, topicIndex: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;

    const topic = this.studyPlan.sections[sectionIndex].topics[topicIndex];
    topic.subtopics.forEach((_, subIndex) => {
      this.setSubtopicChecked(sectionIndex, topicIndex, subIndex, checked);
    });

    this.updateSectionProgress(sectionIndex);
    this.saveStateToLocalStorage();
  }

  onSubtopicCheckboxChange(
    sectionIndex: number,
    topicIndex: number,
    subIndex: number,
    event: Event
  ) {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;

    this.setSubtopicChecked(sectionIndex, topicIndex, subIndex, checked);
    this.updateSectionProgress(sectionIndex);
    this.saveStateToLocalStorage();
  }

  isSectionChecked(sectionIndex: number): boolean {
    const section = this.studyPlan.sections[sectionIndex];
    return section.topics.every((topic, tIndex) =>
      topic.subtopics.every((_, sIndex) => this.getSubtopicChecked(sectionIndex, tIndex, sIndex))
    );
  }

  isTopicChecked(sectionIndex: number, topicIndex: number): boolean {
    const topic = this.studyPlan.sections[sectionIndex].topics[topicIndex];
    return topic.subtopics.every((_, sIndex) => this.getSubtopicChecked(sectionIndex, topicIndex, sIndex));
  }

  isSubtopicChecked(sectionIndex: number, topicIndex: number, subIndex: number): boolean {
    return this.getSubtopicChecked(sectionIndex, topicIndex, subIndex);
  }

  private getSubtopicChecked(sectionIndex: number, topicIndex: number, subIndex: number): boolean {
    const key = this.makeKey(sectionIndex, topicIndex, subIndex);
    return localStorage.getItem(key) === 'true';
  }

  private setSubtopicChecked(
    sectionIndex: number,
    topicIndex: number,
    subIndex: number,
    checked: boolean
  ) {
    const key = this.makeKey(sectionIndex, topicIndex, subIndex);
    localStorage.setItem(key, String(checked));
  }

  private makeKey(sectionIndex: number, topicIndex: number, subIndex: number): string {
    return `teach-u-client_${sectionIndex}_${topicIndex}_${subIndex}`;
  }

  updateSectionProgress(sectionIndex: number) {
    const section = this.studyPlan.sections[sectionIndex];
    let checkedCount = 0;
    let totalCount = 0;

    section.topics.forEach((topic, tIndex) => {
      topic.subtopics.forEach((_, sIndex) => {
        totalCount++;
        if (this.getSubtopicChecked(sectionIndex, tIndex, sIndex)) {
          checkedCount++;
        }
      });
    });

    this.sectionProgress[sectionIndex].checked = checkedCount;
    this.sectionProgress[sectionIndex].total = totalCount;
  }

  updateAllSectionProgress() {
    this.studyPlan.sections.forEach((_, i) => {
      this.updateSectionProgress(i);
    });
  }

  saveStateToLocalStorage() {
    localStorage.setItem('openedSections', JSON.stringify(this.openedSections));
  }

  loadStateFromLocalStorage() {
    const expansions = localStorage.getItem('openedSections');
    if (expansions) {
      this.openedSections = JSON.parse(expansions);
    }
  }

  getProgressPercent(sectionIndex: number): number {
    const { checked, total } = this.sectionProgress[sectionIndex];
    return total === 0 ? 0 : (checked / total) * 100;
  }
}
