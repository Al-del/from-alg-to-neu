import { Routes } from '@angular/router';
import { Home } from './home';
import { Committee } from './committee';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'committee', component: Committee },
];
