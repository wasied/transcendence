import { Component, ElementRef, Input, AfterViewInit } from '@angular/core';
import tippy from 'tippy.js';

import { Achievement } from 'src/app/core/models/achievement.model'; // Import your Achievement model

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css']
})
export class AchievementComponent implements AfterViewInit {
  @Input() achievement: Achievement | undefined;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    // Initialize the tooltips
    this.initializeTooltips();
  }

  initializeTooltips() {
    tippy(this.elementRef.nativeElement.querySelector('#achievementIcon'), {
      content: this.createTooltipContent(),
      allowHTML: true,
      interactive: true,
      duration: [100, 100],
      placement: 'bottom',
    });
  }

  createTooltipContent(): string {
    if (this.achievement) {
      const formattedDate = this.achievement.date
        ? this.formatDate(this.achievement.date)
        : 'Unknown Date';

      return `
        <div class="bg-gray-200 text-black rounded p-2 text-left">
			<p class="font-semibold">${this.achievement.achievementName}</p>
			<div class="text-sm text-zinc-600">
				<p class="">${this.achievement.description}</p>
				<p>Unlocked on ${formattedDate}</p>
			</div>
		</div>
      `;
    }
    return ''; // Return an empty string if no achievement data is available.
  }

  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  }
}
