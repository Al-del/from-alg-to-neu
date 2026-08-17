import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface CommitteeMember {
  name: string;
  role: string;
  photo?: string;
}

interface CommitteeGroup {
  label: string;
  subtitle?: string;
  members: CommitteeMember[];
}

@Component({
  selector: 'app-committee',
  imports: [RouterLink],
  templateUrl: './committee.html',
  styleUrl: './app.css',
})
export class Committee {
  private readonly brokenPhotos = new Set<string>();

  photoFailed(photo: string): boolean {
    return this.brokenPhotos.has(photo);
  }

  onPhotoError(photo: string): void {
    this.brokenPhotos.add(photo);
  }

  readonly groups: CommitteeGroup[] = [
    {
      label: 'General Committee',
      members: [
        {
          name: 'Alexandra Raicu',
          role: 'Associate Professor, PhD in Engineering at Constanta Maritime University',
          photo: 'committee/alexandra-raicu.jpg',
        },
        {
          name: 'Alex Bordei',
          role: 'AI & Technology Advisor | Digital Products Lead | International Speaker',
          photo: 'committee/alex-bordei.jpg',
        },
        {
          name: 'Mădălina Cerșamba',
          role: 'Assistant Lecturer, PhD Candidate (Eng.)',
          photo: 'committee/madalina-cersamba.jpg',
        },
        {
          name: 'Tatiana Barbaros',
          role: 'Psychologist, Lecturer, PhD',
          photo: 'committee/tatiana-barbaros.jpg',
        },
        {
          name: 'L. Dan Milici',
          role: 'Dean, Faculty of Electrical Engineering and Computer Science',
          photo: 'committee/dan-milici.jpg',
        },
        {
          name: 'Gabriel Raicu',
          role: 'Rector, Associate Professor, PhD in Engineering at Constanta Maritime University',
          photo: 'committee/gabriel-raicu.jpg',
        },
      ],
    },
    {
      label: 'Scientific Paper Committee',
      subtitle: 'Judging: August 21, 10:00–11:00 & August 23, 17:00',
      members: [
        {
          name: 'L. Dan Milici',
          role: 'Dean, Faculty of Electrical Engineering and Computer Science',
          photo: 'committee/dan-milici.jpg', //maria_toader.jpg
        },
          {
          name: 'Maria Toader',
          role: 'Two times silver medalist ONCS, third place Scientific papers competition',
          photo: 'committee/maria_toader.jpg', //maria_toader.jpg
        },
                        {
          name: 'Andrei-Cristian Popescu',
          role: 'B.Sc. Student in Microelectronics & Nanotechnology, POLITEHNICA Bucharest Student Representative',
          photo: 'committee/andrei_popescu.jpg',
        },
                        {
          name: 'Andrei Preda',
          role: 'Lecturer, PhD in Engineering at Constanta Maritime University',
          photo: 'committee/predus.jpeg',
        },
        {
          name: 'Tatiana Barbaros',
          role: 'Psychologist, Lecturer, PhD Ovidius University of Constanta',
          photo: 'committee/tatiana-barbaros.jpg',
        },
        {
          name: 'Cristina-Elena Ungureanu',
          role: 'PhD Candidate (Economics)',
          photo: 'committee/cristina-elena-ungureanu.jpg',
        },
        {
          name: 'Alexandra Raicu',
          role: 'Associate Professor, PhD in Engineering at Constanta Maritime University',
          photo: 'committee/alexandra-raicu.jpg',
        },
        {
          name: 'Cristina Dragomir',
          role: 'Associate Professor, PhD in Engineering at Constanta Maritime University',
          photo: 'committee/cristina-dragomir.jpg',
        },
      ],
    },
    {
      label: 'AI Competition Committee',
      members: [
        {
          name: 'Dedu Răzvan-Matei',
          role: 'Silver medal CEOAI, IAIO 2027 participant, 1st place ONIA',
          photo: 'committee/dedu-razvan-matei.jpg',
        },
        {
          name: 'Stanciu Rares',
          role: 'IAIO bronze medalist, gold medal ROAI, IOAI bronze medal',
          photo: 'committee/stanciu-rares.jpg',
        },
        {
          name: 'Stefan Asandei',
          role: 'IOAI silver medal, CEOAI silver medal, gold medal ROAI',
          photo: 'committee/stefan-asandei.jpg',
        },
        {
          name: 'Gheorghica Istrate David',
          role: 'Bronze medal CEOAI, ISEF finalist, gold medal ROAI',
          photo: 'committee/gheorghica-istrate-david.jpg',
        },
        {
          name: 'Ciortea-Suciu Andrei',
          role: 'Silver medal ROAI, silver medal CEOAI',
          photo: 'committee/ciortea-suciu-andrei.jpg',
        },
      ],
    },
    {
      label: 'Hackathon Committee',
      subtitle: 'Judging: August 23, 17:00',
      members: [
        {
          name: 'Mădălina Cerșamba',
          role: 'Assistant Lecturer, PhD Candidate (Eng.)',
          photo: 'committee/madalina-cersamba.jpg',
        },
        {
          name: 'Alex Bordei',
          role: 'AI & Technology Advisor | Digital Products Lead | International Speaker',
          photo: 'committee/alex-bordei.jpg',
        },
        {
          name: 'Gabriel Raicu',
          role: 'Rector, Associate Professor, PhD in Engineering at Constanta Maritime University',
          photo: 'committee/gabriel-raicu.jpg',
        },
               {
          name: 'Dedu Răzvan-Matei',
          role: 'Silver medal CEOAI, IAIO 2027 participant, 1st place ONIA',
          photo: 'committee/dedu-razvan-matei.jpg',
        },
        {
          name: 'Alexandru Pescaru',
          role: 'Lecturer, PhD in Engineering at Constanta Maritime University',
          photo: 'committee/alex-pesc.jpg',
        },
      ],
    },
  ];

  initials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }
}
