import { Component, signal, OnDestroy, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

// ─── EmailJS Configuration ────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Add an Email Service (connect your iCloud account)
// 3. Create two Email Templates:
//      Volunteer template variables: from_name, from_email, skills, message
//      Registration template variables: from_name, from_email, phone, school, grade, track
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
  dotColor: string;
  badge?: string;
  badgeClass?: string;
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

  volunteerData = { name: '', email: '', skills: '', message: '' };
  registrationData = { name: '', email: '', phone: '', school: '', grade: '', participation: 'full' };

  private emailjs: any = null;
  private scrollObserver?: IntersectionObserver;

  readonly days: ScheduleDay[] = [
    {
      label: 'Thu · Aug 21',
      date: 'Thursday, August 21 — Arrival Day',
      events: [
        {
          title: 'Participant Arrival & Check-in',
          time: 'All day',
          description: 'Arrive, settle in, and pick up your badge and welcome kit.',
          dotColor: 'bg-slate-300',
          badge: 'Arrival',
          badgeClass: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        },
        {
          title: 'Welcome Reception',
          time: '19:00',
          description: 'Meet fellow participants, mentors, and organizers over dinner.',
          dotColor: 'bg-slate-300',
        },
      ],
    },
    {
      label: 'Fri · Aug 22',
      date: 'Friday, August 22 — Signals Day',
      events: [
        {
          title: 'Workshop: Digital Signals',
          time: '09:00',
          description:
            'Hands-on workshop covering digital signal processing — sampling, filtering, FFT, and real-world applications.',
          dotColor: 'bg-blue-500',
          badge: 'Workshop',
          badgeClass: 'bg-blue-950 text-blue-400 border-blue-900',
        },
        {
          title: 'Competitive AI Competition',
          time: '14:00',
          description:
            'A 3-hour individual or team challenge. Solve signal-based AI problems under time pressure. Prizes for top finishers.',
          dotColor: 'bg-slate-400',
          badge: '3 Hours',
          badgeClass: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        },
        {
          title: 'Meal Break & Networking',
          time: '17:00',
          description: 'Recharge and connect with participants over dinner.',
          dotColor: 'bg-slate-300',
        },
      ],
    },
    {
      label: 'Sat · Aug 23',
      date: 'Saturday, August 23 — Build Day',
      events: [
        {
          title: 'Workshop: Signal Reading Machine',
          time: '09:00',
          description:
            'Build a physical signal acquisition device using Arduino or ESP32 — from hardware wiring to real-time data streaming.',
          dotColor: 'bg-blue-500',
          badge: 'Workshop',
          badgeClass: 'bg-blue-950 text-blue-400 border-blue-900',
        },
        {
          title: 'Hackathon Kickoff',
          time: '13:00',
          description:
            'Theme: "Signals: Improve Our Future." The 24-hour clock starts now. Teams build projects that leverage signal data to solve real-world problems.',
          dotColor: 'bg-zinc-300',
          badge: '24H Hackathon Starts',
          badgeClass: 'bg-slate-900 text-slate-100 border-slate-800',
        },
      ],
    },
    {
      label: 'Sun · Aug 24',
      date: 'Sunday, August 24 — Finals Day',
      events: [
        {
          title: 'Hackathon Submission Deadline',
          time: '13:00',
          description: 'Code freeze. All project submissions must be finalized. Prepare your demo.',
          dotColor: 'bg-amber-500',
          badge: 'Deadline',
          badgeClass: 'bg-amber-950 text-amber-400 border-amber-900',
        },
        {
          title: 'Project Judging',
          time: '14:00',
          description:
            'Teams present to a panel of judges. Each team gets a dedicated demo slot with Q&A.',
          dotColor: 'bg-slate-400',
        },
        {
          title: 'Award Ceremony',
          time: '17:00',
          description:
            'Celebrate the winners of the hackathon and AI competition. Prizes, certificates, and closing remarks.',
          dotColor: 'bg-blue-500',
          badge: 'Prizes',
          badgeClass: 'bg-blue-950 text-blue-400 border-blue-900',
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

      // Scroll fade-in / fade-out via IntersectionObserver
      this.scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            entry.target.classList.remove('is-gone');
          } else if (entry.boundingClientRect.top < 0) {
            entry.target.classList.add('is-gone');
            entry.target.classList.remove('is-visible');
          } else {
            entry.target.classList.remove('is-visible', 'is-gone');
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.scroll-fade').forEach(el => this.scrollObserver!.observe(el));
    });
  }

  ngOnDestroy() {
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    this.scrollObserver?.disconnect();
  }

  private updateCountdown() {
    const diff = new Date('2026-08-21T00:00:00').getTime() - Date.now();
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
    } catch {
      this.volunteerError.set(true);
    } finally {
      this.volunteerLoading.set(false);
    }
  }

  async submitRegistration(form: any) {
    if (!form.valid || !this.emailjs) return;
    this.registrationLoading.set(true);
    this.registrationError.set(false);
    const tracks: Record<string, string> = {
      full: 'Full Event (All 4 days)',
      workshops: 'Workshops Only',
      hackathon: 'Hackathon Only',
      competition: 'AI Competition Only',
    };
    try {
      await this.emailjs.send(EMAILJS_SERVICE_ID, REGISTRATION_TEMPLATE_ID, {
        from_name: this.registrationData.name,
        from_email: this.registrationData.email,
        phone: this.registrationData.phone || '—',
        school: this.registrationData.school,
        grade: this.registrationData.grade,
        track: tracks[this.registrationData.participation],
      });
      this.registrationSubmittedName.set(this.registrationData.name.split(' ')[0]);
      this.registrationSubmitted.set(true);
    } catch {
      this.registrationError.set(true);
    } finally {
      this.registrationLoading.set(false);
    }
  }
}
