import { Routes } from '@angular/router';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { Education } from './components/education/education';
import { Contact } from './components/contact/contact';

export const routes: Routes = [
  { path: '', component: Hero },           // ← Ruta raíz: /
  { path: 'about', component: About },      // ← /about
  { path: 'skills', component: Skills },    // ← /skills
  { path: 'projects', component: Projects }, // ← /projects
  { path: 'education', component: Education }, // ← /education
  { path: 'contact', component: Contact },  // ← /contact
  { path: '**', redirectTo: '' }                      // ← Cualquier otra URL → /
];
