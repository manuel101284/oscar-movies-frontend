import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MovieListComponent } from './components/movie-list/movie-list';
import { MovieFormComponent } from './components/movie-form/movie-form';
import { MovieDetailComponent } from './components/movie-detail/movie-detail';

const routes: Routes = [
  { path: '', component: MovieListComponent }
];

@NgModule({
  declarations: [
    MovieListComponent,
    MovieFormComponent,
    MovieDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    MovieListComponent,
    MovieFormComponent,
    MovieDetailComponent,
  ]
})
export class MoviesModule { }