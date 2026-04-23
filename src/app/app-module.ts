import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app/app-routing-module';
import { App } from '../app/app';
import { MoviesModule } from './features/movies/movies-module';

// NO importes componentes individuales aquí
// Los componentes ya están declarados en MoviesModule

@NgModule({
  declarations: [
    App  // Solo el componente principal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MoviesModule  // Esto ya trae todos los componentes de películas
  ],
  providers: [
    provideHttpClient(withFetch())  // Proporciona HttpClient usando Fetch API
  ],
  bootstrap: [App]
})
export class AppModule { }