import { Component, signal, OnDestroy, afterNextRender } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface ScheduleEvent {
  title: string;
  time?: string;
  description?: string;
  badge?: string;
}

interface ScheduleDay {
  label: string;
  date: string;
  events: ScheduleEvent[];
}

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './app.css',
})
export class Home implements OnDestroy {
  activeDay = signal(0);
  countdown = signal({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  readonly days: ScheduleDay[] = [
    {
      label: 'Thu · Aug 20',
      date: 'Thursday, August 20 — Arrival Day',
      events: [
        {
          title: 'Participant Arrival & Check-in',
          time: '14:00 – 17:00',
          description: 'Arrive, settle in, and pick up your badge and welcome kit.',
          badge: 'Arrival',
        },
        {
          title: 'Scientific Poster Stands',
          time: '14:00 – 17:00',
          description: 'Browse student research posters on display throughout the afternoon.',
          badge: 'Exhibition',
        },
        {
          title: 'Welcome Reception',
          time: '17:00',
          description: 'Meet fellow participants, mentors, and organizers.',
        },
      ],
    },
    {
      label: 'Fri · Aug 21',
      date: 'Friday, August 21 — Panels & Workshops Day',
      events: [
        {
          title: 'Scientific Corner: Presentation & Evaluation',
          time: '10:00',
          badge: 'Scientific Corner',
        },
        {
          title: 'Panels',
          time: '11:00 – 13:00',
        },
        {
          title: 'Workshop: Signal Reading Machine — Hands-On',
          time: '14:00 – 17:00',
          badge: 'Workshop',
        },
        {
          title: 'Workshops',
          time: '17:00 – 18:00',
        },
        {
          title: 'Social Night',
          time: '18:00 – 20:00',
        },
      ],
    },
    {
      label: 'Sat · Aug 22',
      date: 'Saturday, August 22 — Competition Day',
      events: [
        {
          title: 'Competitive AI Competition',
          time: '09:00 – 14:00',
          badge: '5 Hours',
        },
        {
          title: 'Workshop: Digital Signals',
          time: '14:00 – 16:00',
          badge: 'Workshop',
        },
        {
          title: 'Workshop: AI',
          time: '16:00 – 17:00',
          badge: 'Workshop',
        },
        {
          title: 'Hackathon Start Announcement',
          time: '17:00',
          badge: 'Hackathon Starts',
        },
      ],
    },
    {
      label: 'Sun · Aug 23',
      date: 'Sunday, August 23 — Hackathon Day',
      events: [
        {
          title: 'Competition Scientific Papers',
          time: '10:00',
        },
        {
          title: 'Hackathon: Project Presentation',
          time: '17:00',
          badge: 'Hackathon',
        },
      ],
    },
    {
      label: 'Mon · Aug 24',
      date: 'Monday, August 24 — Finals Day',
      events: [
        {
          title: 'Insights',
          time: '10:00 – 11:00',
        },
        {
          title: 'Award Ceremony',
          time: '11:00',
          badge: 'Prizes',
        },
        {
          title: 'Leaving',
          time: '12:00',
        },
      ],
    },
  ];

  private countdownInterval?: ReturnType<typeof setInterval>;

  constructor() {
    afterNextRender(() => {
      this.updateCountdown();
      this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);
    });
  }

  ngOnDestroy() {
    if (this.countdownInterval) clearInterval(this.countdownInterval);
  }

  private updateCountdown() {
    const diff = new Date('2026-08-20T00:00:00').getTime() - Date.now();
    if (diff <= 0) {
      this.countdown.set({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }
    this.countdown.set({
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    });
  }

  pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  setActiveDay(i: number) {
    this.activeDay.set(i);
  }
}
