import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudyPlanService, StudyPlan } from './study-plan.service';

/**
 * PlanComponent (standalone)
 * - Displays the entire study plan
 * - Manages checkboxes for sections, topics, subtopics
 * - Tracks progress and saves state in localStorage
 */
@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [CommonModule], // Needed for *ngFor, *ngIf, etc.
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {
  studyPlan!: StudyPlan;

  // Tracks which sections are expanded (true = expanded)
  openedSections: boolean[] = [];

  // Each section: how many subtopics are checked vs total
  sectionProgress: { checked: number; total: number }[] = [];

  constructor(private studyPlanService: StudyPlanService) {}

  ngOnInit(): void {
    // 1) Load the plan data from the service
    this.studyPlan = this.studyPlanService.getPlan();

    // 2) Initialize expansions (collapsed by default)
    this.openedSections = this.studyPlan.sections.map(() => false);

    // 3) Initialize progress counters
    this.sectionProgress = this.studyPlan.sections.map(() => ({
      checked: 0,
      total: 0,
    }));

    // 4) Count how many subtopics in each section
    this.studyPlan.sections.forEach((section, sIndex) => {
      let total = 0;
      section.topics.forEach((topic) => {
        total += topic.subtopics.length;
      });
      this.sectionProgress[sIndex].total = total;
    });

    // 5) Load expansions (and subtopic checks) from localStorage if present
    this.loadStateFromLocalStorage();

    // 6) Refresh progress after loading
    this.updateAllSectionProgress();
  }

  /**
   * Toggle expansion for a given section
   */
  toggleSection(sectionIndex: number): void {
    this.openedSections[sectionIndex] = !this.openedSections[sectionIndex];
    // Optionally save expansions right away
    this.saveStateToLocalStorage();
  }

  /**
   * Handle the section-level checkbox (marks/unmarks all subtopics in that section)
   */
  onSectionCheckboxChange(sectionIndex: number, event: Event) {
    // Cast to HTMLInputElement | null
    const input = event.target as HTMLInputElement | null;
    if (!input) return; // If for some reason event.target is null or not <input>, exit.

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

  /**
   * Handle the topic-level checkbox (marks/unmarks all subtopics in that topic)
   */
  onTopicCheckboxChange(sectionIndex: number, topicIndex: number, event: Event) {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    const checked = input.checked;

    const topic = this.studyPlan.sections[sectionIndex].topics[topicIndex];
    topic.subtopics.forEach((_, subIndex) => {
      this.setSubtopicChecked(sectionIndex, topicIndex, subIndex, checked);
    });

    this.updateSectionProgress(sectionIndex);
    this.saveStateToLocalStorage();
  }

  /**
   * Handle a single subtopic checkbox
   */
  onSubtopicCheckboxChange(
    sectionIndex: number,
    topicIndex: number,
    subIndex: number,
    event: Event
  ) {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    const checked = input.checked;

    this.setSubtopicChecked(sectionIndex, topicIndex, subIndex, checked);
    this.updateSectionProgress(sectionIndex);
    this.saveStateToLocalStorage();
  }

  /**
   * Determine if an entire section is checked (all subtopics in it)
   */
  isSectionChecked(sectionIndex: number): boolean {
    const section = this.studyPlan.sections[sectionIndex];
    return section.topics.every((topic, tIndex) =>
      topic.subtopics.every((_, sIndex) =>
        this.getSubtopicChecked(sectionIndex, tIndex, sIndex)
      )
    );
  }

  /**
   * Determine if a whole topic is checked
   */
  isTopicChecked(sectionIndex: number, topicIndex: number): boolean {
    const topic = this.studyPlan.sections[sectionIndex].topics[topicIndex];
    return topic.subtopics.every((_, sIndex) =>
      this.getSubtopicChecked(sectionIndex, topicIndex, sIndex)
    );
  }

  /**
   * Determine if a single subtopic is checked
   */
  isSubtopicChecked(sectionIndex: number, topicIndex: number, subIndex: number): boolean {
    return this.getSubtopicChecked(sectionIndex, topicIndex, subIndex);
  }

  /**
   * Read from localStorage whether a subtopic is checked
   */
  private getSubtopicChecked(
    sectionIndex: number,
    topicIndex: number,
    subIndex: number
  ): boolean {
    const key = this.makeKey(sectionIndex, topicIndex, subIndex);
    return localStorage.getItem(key) === 'true';
  }

  /**
   * Save the subtopic's check state to localStorage
   */
  private setSubtopicChecked(
    sectionIndex: number,
    topicIndex: number,
    subIndex: number,
    checked: boolean
  ) {
    const key = this.makeKey(sectionIndex, topicIndex, subIndex);
    localStorage.setItem(key, String(checked));
  }

  /**
   * Build a unique localStorage key for each subtopic
   */
  private makeKey(sectionIndex: number, topicIndex: number, subIndex: number): string {
    return `teach-u-client_${sectionIndex}_${topicIndex}_${subIndex}`;
  }

  /**
   * Update progress info for one section
   */
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

  /**
   * Update progress for all sections
   */
  updateAllSectionProgress() {
    this.studyPlan.sections.forEach((_, sIndex) => {
      this.updateSectionProgress(sIndex);
    });
  }

  /**
   * Save expansions to localStorage
   */
  saveStateToLocalStorage() {
    localStorage.setItem('openedSections', JSON.stringify(this.openedSections));
  }

  /**
   * Load expansions from localStorage (subtopic checks are loaded on the fly)
   */
  loadStateFromLocalStorage() {
    const expansions = localStorage.getItem('openedSections');
    if (expansions) {
      this.openedSections = JSON.parse(expansions);
    }
  }

  /**
   * A helper for the percentage used in the progress bar
   */
  getProgressPercent(sectionIndex: number): number {
    const { checked, total } = this.sectionProgress[sectionIndex];
    return total === 0 ? 0 : (checked / total) * 100;
  }
}
