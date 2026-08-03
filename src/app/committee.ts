import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface CommitteeMember {
  name: string;
  role: string;
  photo: string;
}

interface CommitteeGroup {
  label: string;
  members: CommitteeMember[];
}

@Component({
  selector: 'app-committee',
  imports: [RouterLink],
  templateUrl: './committee.html',
  styleUrl: './app.css',
})
export class Committee {
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
          role: 'Asist. Univ. Drd. Ing.',
          photo: 'committee/madalina-cersamba.jpg',
        },
        {
          name: 'Tatiana Barbaros',
          role: 'Psiholog, Lector Universitar Dr.',
          photo: 'committee/tatiana-barbaros.jpg',
        },
        {
          name: 'L. Dan Milici',
          role: 'Decan, Facultatea de Inginerie Electrică și Știința Calculatoarelor',
          photo: 'committee/dan-milici.jpg',
        },
      ],
    },
    {
      label: 'Scientific Paper Committee',
      members: [
        {
          name: 'L. Dan Milici',
          role: 'Decan, Facultatea de Inginerie Electrică și Știința Calculatoarelor',
          photo: 'committee/dan-milici.jpg',
        },
        {
          name: 'Tatiana Barbaros',
          role: 'Psiholog, Lector Universitar Dr.',
          photo: 'committee/tatiana-barbaros.jpg',
        },
        {
          name: 'Cristina-Elena Ungureanu',
          role: 'Drd. Ec.',
          photo: 'committee/cristina-elena-ungureanu.jpg',
        },
        {
          name: 'Alexandra Raicu',
          role: 'Associate Professor, PhD in Engineering at Constanta Maritime University',
          photo: 'committee/alexandra-raicu.jpg',
        },
      ],
    },
    {
      label: 'AI Competition Committee',
      members: [
        {
          name: 'Dedu Răzvan-Matei',
          role: 'Silver medal CEOAI, IAIO participant',
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
      members: [
        {
          name: 'Alexandra Raicu',
          role: 'Associate Professor, PhD in Engineering at Constanta Maritime University',
          photo: 'committee/alexandra-raicu.jpg',
        },
        {
          name: 'Mădălina Cerșamba',
          role: 'Asist. Univ. Drd. Ing.',
          photo: 'committee/madalina-cersamba.jpg',
        },
        {
          name: 'Alex Bordei',
          role: 'AI & Technology Advisor | Digital Products Lead | International Speaker',
          photo: 'committee/alex-bordei.jpg',
        },
      ],
    },
  ];
}
