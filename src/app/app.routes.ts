import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ConfigComponent } from './component/config/config.component';
import { SummaryComponent } from './component/summary/summary.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'summary', component: SummaryComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
