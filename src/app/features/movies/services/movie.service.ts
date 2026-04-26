import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, MovieCreate, MovieFilters } from '../models/movie';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class MovieService {
  private readonly apiUrl = `${environment.apiUrl}/movies-oscar`;

  constructor(private http: HttpClient) { }
  
  // Obtener todas las peliculas
  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  // Obtener una pelicula por su ID
  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva pelicula
  createMovie(movie: MovieCreate): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  // Actualizar una pelicula existente
  updateMovie(id: string, movie: MovieCreate): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/${id}`, movie);
  }

  // Eliminar una pelicula por su ID
  deleteMovie(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Busqueda por filtros
  // Buscar por titulo
  searchMovieByTitle(title: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/search/title?title=${title}`);
  }

  // Buscar por director
  searchMovieByDirector(director: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/search/director?director=${director}`);
  }

  // Buscar por año
  searchMovieByYear(year: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/search/year?year=${year}`);
  }

  // Buscar por actriz
  searchMovieByActress(actress: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/search/actress?actress=${actress}`);
  }

  // Buscar por actor
  searchMovieByActor(actor: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/search/actor?actor=${actor}`);
  }

  // Buscar por rango de anios
  searchMovieByYearRange(startYear: number, endYear: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/search/year-range?startYear=${startYear}&endYear=${endYear}`);
  }

  // Obtener películas recientes (ordenadas por año descendente)
  getRecentMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/recent`);
  }

  getPoster(title: string): Observable<Movie[]> {
    console.log('Solicitando películas al backend...');
    return this.http.get<Movie[]>(this.apiUrl);
  }
}
