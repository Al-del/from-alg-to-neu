import { Component, signal, OnDestroy, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

// ─── EmailJS Configuration ────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Add an Email Service (connect your iCloud account)
// 3. Create two Email Templates:
//      Volunteer template variables: from_name, from_email, skills, message
//      Registration template variables: from_name, from_email, phone, school, grade, tracks, cv_link, attendance, ml_username
// 4. Replace the four values below with your credentials from the EmailJS dashboard
const EMAILJS_PUBLIC_KEY = 'JcWG6TiYSS7HOl7oE';
const EMAILJS_SERVICE_ID = 'service_9l0rztv';
const VOLUNTEER_TEMPLATE_ID = 'template_jgwhxjc';
const REGISTRATION_TEMPLATE_ID = 'template_nn2cs28';
// ─────────────────────────────────────────────────────────────────────────────

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
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnDestroy {
  activeDay = signal(0);
  countdown = signal({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  volunteerSubmitted = signal(false);
  volunteerLoading = signal(false);
  volunteerError = signal(false);
  volunteerSubmittedName = signal('');

  registrationSubmitted = signal(false);
  registrationLoading = signal(false);
  registrationError = signal(false);
  registrationSubmittedName = signal('');
  registrationTracksError = signal(false);
  registrationAttendanceError = signal(false);

  volunteerData = { name: '', email: '', skills: '', message: '' };
  registrationData = {
    name: '',
    email: '',
    phone: '',
    school: '',
    grade: '',
    cvLink: '',
    attendanceMode: '',
    mlUsername: '',
    tracks: { aiCompetition: false, hackathon: false, scientificShowcase: false },
  };

  private emailjs: any = null;

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
      // Lazy-load EmailJS so it never runs during SSR
      import('@emailjs/browser').then((mod) => {
        this.emailjs = mod.default;
        this.emailjs.init(EMAILJS_PUBLIC_KEY);
      });

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

  async submitVolunteer(form: any) {
    if (!form.valid || !this.emailjs) return;
    this.volunteerLoading.set(true);
    this.volunteerError.set(false);
    try {
      await this.emailjs.send(EMAILJS_SERVICE_ID, VOLUNTEER_TEMPLATE_ID, {
        from_name: this.volunteerData.name,
        from_email: this.volunteerData.email,
        skills: this.volunteerData.skills || '—',
        message: this.volunteerData.message || '—',
      });
      this.volunteerSubmittedName.set(this.volunteerData.name.split(' ')[0]);
      this.volunteerSubmitted.set(true);
    } catch (err) {
      console.error('EmailJS volunteer submission failed:', err);
      this.volunteerError.set(true);
    } finally {
      this.volunteerLoading.set(false);
    }
  }

  private readonly trackLabels: Record<string, string> = {
    aiCompetition: 'AI Competition',
    hackathon: 'Hackathon',
    scientificShowcase: 'Scientific Showcase',
  };

  async submitRegistration(form: any) {
    const tracks = this.registrationData.tracks;
    const hasTrack = tracks.aiCompetition || tracks.hackathon || tracks.scientificShowcase;
    this.registrationTracksError.set(!hasTrack);
    const hasAttendance = !!this.registrationData.attendanceMode;
    this.registrationAttendanceError.set(!hasAttendance);
    if (!form.valid || !hasTrack || !hasAttendance || !this.emailjs) return;

    this.registrationLoading.set(true);
    this.registrationError.set(false);
    const tracksSummary = Object.entries(tracks)
      .filter(([, checked]) => checked)
      .map(([key]) => this.trackLabels[key])
      .join(', ');
    const isInPerson = this.registrationData.attendanceMode === 'in-person';
    try {
      await this.emailjs.send(EMAILJS_SERVICE_ID, REGISTRATION_TEMPLATE_ID, {
        from_name: this.registrationData.name,
        from_email: this.registrationData.email,
        phone: this.registrationData.phone || '—',
        school: this.registrationData.school,
        grade: this.registrationData.grade,
        tracks: tracksSummary,
        cv_link: this.registrationData.cvLink || '—',
        attendance: isInPerson ? 'In-Person' : 'Online',
        ml_username: tracks.aiCompetition && isInPerson ? this.registrationData.mlUsername || '—' : '—',
      });
      this.registrationSubmittedName.set(this.registrationData.name.split(' ')[0]);
      this.registrationSubmitted.set(true);
    } catch (err) {
      console.error('EmailJS registration submission failed:', err);
      this.registrationError.set(true);
    } finally {
      this.registrationLoading.set(false);
    }
  }
}
