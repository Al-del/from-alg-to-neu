import { Component, signal, OnDestroy, afterNextRender } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ScheduleEvent {
  title: string;
  time?: string;
  location?: string;
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
  imports: [RouterLink],
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
          location: 'Main Hall, Ground Floor (Entrance)',
          description: 'Arrive, settle in, and pick up your badge and welcome kit.',
          badge: 'Arrival',
        },
        {
          title: 'Scientific Poster Set-Up',
          time: '14:00 – 17:00',
          location: 'Ground Floor (Entrance)',
          description: 'Set up your poster ahead of the Scientific Corner showcase.',
          badge: 'Exhibition',
        },
        {
          title: 'Welcoming Ceremony',
          time: '17:00',
          location: 'Auditorium, First Floor',
          description: 'Meet fellow participants, mentors, and organizers.',
        },
      ],
    },
    {
      label: 'Fri · Aug 21',
      date: 'Friday, August 21 — Panels & Workshops Day',
      events: [
        {
          title: 'Scientific Corner: Poster Showcase',
          time: '10:00 – 11:00',
          location: 'Ground Floor (Entrance)',
          badge: 'Scientific Corner',
        },
        {
          title: 'Workshop — Bitmi',
          time: '10:00 – 12:00',
          location: 'Room 112',
          badge: 'Workshop',
        },
        {
          title: 'Panels',
          time: '11:00 – 13:00',
          location: 'Auditorium, First Floor',
          description: 'With Dr. Milici, Dr. Raicu, Alex Bordei, and Dr. Cristina Dragomir.',
        },
        {
          title: 'Lunch Break',
          time: '13:00 – 14:00',
          location: 'First Floor',
        },
        {
          title: 'Workshop: Signal Reading Machine — Hands-On',
          time: '14:00 – 17:00',
          location: 'Auditorium, First Floor',
          badge: 'Workshop',
        },
        {
          title: 'Workshop: AI ',
          time: '17:00 – 18:00',
          location: 'Auditorium, First Floor',
          badge: 'Workshop',
        },
        {
          title: 'Social Night',
          time: '18:00 – 20:00',
          location: 'First Floor',
        },
      ],
    },
    {
      label: 'Sat · Aug 22',
      date: 'Saturday, August 22 — Competition Day',
      events: [
        {
          title: 'AI Competition',
          time: '09:00 – 14:00',
          badge: '5 Hours',
        },
        {
          title: 'Lunch Break',
          time: '14:00 – 14:30',
          location: 'First Floor',
        },
        {
          title: 'IEEE Prfresentation Dr. Cristina Ungureanu & Andrei Popescu',
          time: '14:30 – 15:30',
          location: 'Auditorium, First Floor',
        },
        {
          title: 'Workshop: AI — Laurențiu Marian Neagu',
          time: '15:00 – 16:00',
          location: 'Room 112',
          badge: 'Workshop',
        },
        {
          title: 'Workshop: EKG & EMG',
          time: '16:00 – 17:00',
          location: 'Auditorium, First Floor',
          badge: 'Workshop',
        },
        {
          title: 'Hackathon Announcement',
          time: '17:00',
          location: 'Auditorium, First Floor',
          badge: 'Hackathon Starts',
        },
        {
          title: 'Problem-Solving Workshop',
          time: '17:30 – 19:00',
          location: 'Auditorium, First Floor',
          badge: 'Workshop',
        },
      ],
    },
    {
      label: 'Sun · Aug 23',
      date: 'Sunday, August 23 — Hackathon Day',
      events: [
        {
          title: 'Panels',
          time: '10:00 – 12:00',
          location: 'Auditorium, First Floor',
        },
        {
          title: 'Competition Scientific Papers',
          time: '12:00 – 13:00',
          location: 'Auditorium, First Floor',
        },
        {
          title: 'Lunch Break',
          time: '13:00 – 14:00',
          location: 'First Floor',
        },
        {
          title: 'Hackathon: Project Presentation',
          time: '17:00',
          location: 'Auditorium, First Floor',
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
          location: 'Auditorium, First Floor',
        },
        {
          title: 'Award Ceremony',
          time: '11:00',
          location: 'Auditorium, First Floor',
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
