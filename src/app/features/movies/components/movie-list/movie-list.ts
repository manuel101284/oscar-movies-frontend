import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.html',
  styleUrls: ['./movie-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
  
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  selectedMovie: Movie | null = null;
  searchTerm: string = '';
  searchType: 'title' | 'director' | 'year' | 'actress' | 'actor'= 'title';
  yearRange = { start: 1920, end: 2000 };
  showForm: boolean = false;
  isEditing: boolean = false;
  movieCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  formMovie: Partial<Movie> = {
    titleMovie: '',
    directorMovie: '',
    yearMovie: new Date().getFullYear(),
    durationMovie: 0,
    actressMovie: '',
    actorMovie: '',
    posterUrlMovie: ''
  };

  constructor(
    private movieService: MovieService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    console.log('🟢 Iniciando carga de películas...');
    this.loading = true;
    this.error = null;

    this.movieService.getAllMovies().subscribe({
      next: (data) => {
        console.log('📦 Datos recibidos del servicio: ', data);
        console.log('📊 Cantidad de películas: ', data.length);
        console.log('📦 Ejemplo de película: ', data[0]);
        console.log('📦 Propiedades de la película: ', Object.keys(data[0]));
        this.movies = [...data];
        this.filteredMovies = [...data];
        this.movieCount = data.length;
        this.loading = false;

        this.cdr.markForCheck();
        
        console.log('✅ Variables actualizadas:');
        console.log('  - movies.length:', this.movies.length);
        console.log('  - filteredMovies.length:', this.filteredMovies.length);
        console.log('  - movieCount:', this.movieCount);
        console.log('  - loading:', this.loading);

        console.log('✅ loading después de asignar:', this.loading);
        console.log('✅ filteredMovies.length:', this.filteredMovies.length);
      },
      error: (error) => {
        console.error('❌ Error:', error);
        this.loading = false;
        this.error = 'Error de conexión';
      }
    });
  }

  search(): void {
    if (!this.searchTerm.trim()) {
      this.filteredMovies = [...this.movies];
      this.cdr.markForCheck();
      return;
    }

    this.loading = true;

    switch (this.searchType) {
      case 'title':
        this.movieService.searchMovieByTitle(this.searchTerm).subscribe({
          next: (data) => {
            this.filteredMovies = [...data];
            this.loading = false;
            
            this.cdr.markForCheck();

            console.log('🔍 Resultados de búsqueda por título:', data.length);
          },
          error: (error) => { console.error('Error:', error); this.loading = false; }
        });
        break;
      case 'director':
        this.movieService.searchMovieByDirector(this.searchTerm).subscribe({
          next: (data) => {
            this.filteredMovies = [...data];
            this.loading = false;

            this.cdr.markForCheck();

            console.log('🔍 Resultados de búsqueda por director:', data.length);
          },
          error: (error) => { console.error('Error:', error); this.loading = false; }
        });
        break;
      case 'year':
        const year = parseInt(this.searchTerm);
        if (!isNaN(year)) {
          this.movieService.searchMovieByYear(year).subscribe({
            next: (data) => {
              this.filteredMovies = [...data];
              this.loading = false;

              this.cdr.markForCheck();

              console.log('🔍 Resultados de búsqueda por año:', data.length);
            },
            error: (error) => { console.error('Error:', error); this.loading = false; }
          });
        }
        break;
      
      case 'actress':
        this.movieService.searchMovieByActress(this.searchTerm).subscribe({
          next: (data) => {
            this.filteredMovies = [...data];
            this.loading = false;

            this.cdr.markForCheck();
            
            console.log('🎭 Resultados por actriz:', data.length);
          },
          error: (error) => {
            console.error('Error:', error);
            this.loading = false;
            this.cdr.markForCheck();
          }
        });
        break;

      case 'actor':
        this.movieService.searchMovieByActor(this.searchTerm).subscribe({
          next: (data) => {
            this.filteredMovies = [...data];
            this.loading = false;
            
            this.cdr.markForCheck();
            
            console.log('🎬 Resultados por actor:', data.length);
          },
          error: (error) => {
            console.error('Error:', error);
            this.loading = false;
            this.cdr.markForCheck();
          }
        });
        break;
    }
  }

  searchByYearRange(): void {
    this.loading = true;

    this.cdr.markForCheck();

    this.movieService.searchMovieByYearRange(this.yearRange.start, this.yearRange.end).subscribe({
      next: (data) => {
        this.filteredMovies = data;
        this.loading = false;

        this.cdr.markForCheck();
        
        console.log('🔍 Resultados por rango de años:', data.length);
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;

        this.cdr.markForCheck();
      }
    });
  }

  showRecentMovies(): void {
    this.loading = true;
    this.movieService.getRecentMovies().subscribe({
      next: (data) => {
        this.filteredMovies = data;
        this.loading = false;

        this.cdr.markForCheck();
        
        console.log('🎬 Películas recientes:', data.length);
      },
      error: (error) => {
        console.error('Error cargando películas recientes:', error);
        this.loading = false;
      }
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.filteredMovies = this.movies;
    this.searchType = 'title';
    this.yearRange = { start: 1920, end: 2050 };

    this.cdr.markForCheck();

    console.log('🔄 Filtros reiniciados - Mostrando: ', this.filteredMovies.length, 'películas');
  }

  viewMovie(movie: Movie): void {
    this.selectedMovie = movie;
    console.log('🔍 Ver detalles de: ', movie.titleMovie);
    console.log('📸 Poster URL: ', movie.posterUrlMovie);
    console.log('🎬 Objeto Completo: ', movie);
  }

  closeModal(): void {
    this.selectedMovie = null;
  }

  openCreateForm(): void {
    this.isEditing = false;
    this.formMovie = {
      titleMovie: '',
      directorMovie: '',
      yearMovie: new Date().getFullYear(),
      durationMovie: 0,
      actressMovie: '',
      actorMovie: '',
      posterUrlMovie: ''
    };
    this.showForm = true;
  }

  editMovie(movie: Movie): void {
    this.isEditing = true;
    this.formMovie = { ...movie };
    this.showForm = true;
  }

  saveMovie(): void {
    this.loading = true;

    if (this.isEditing && this.formMovie.id) {
      this.movieService.updateMovie(this.formMovie.id, this.formMovie as Movie).subscribe({
        next: () => {
          this.loadMovies();
          this.closeForm();
          this.loading = false;
          alert('✅ Película actualizada correctamente');
        },
        error: (error) => {
          console.error('Error:', error);
          this.loading = false;
          alert('❌ Error al actualizar la película');
        }
      });
    } else {
      this.movieService.createMovie(this.formMovie as Movie).subscribe({
        next: () => {
          this.loadMovies();
          this.closeForm();
          this.loading = false;
          alert('✅ Película creada correctamente');
        },
        error: (error) => {
          console.error('Error:', error);
          this.loading = false;
          alert('❌ Error al crear la película');
        }
      });
    }
  }

  deleteMovie(id: string | undefined): void {
    console.log('🗑️ ID recibido:', id);

    if (!id) {
      console.error('❌ ID no válido:', id);
      alert('Error: No se pudo identificar la película');
      return;
    }

    // Buscar la película por ID para mostrar el título
    const movie = this.movies.find(m => m.id === id);
    const movieTitle = movie ? movie.titleMovie : 'esta película';

    if (confirm(`¿Estás seguro de eliminar "${movieTitle}"?`)) {
      this.loading = true;
      this.cdr.markForCheck();

      this.movieService.deleteMovie(id).subscribe({
        next: () => {
          console.log('✅ Eliminación exitosa');
          this.loadMovies();
          this.loading = false;
          this.cdr.markForCheck();
          alert('✅ Película eliminada correctamente');
        },
        error: (error) => {
          console.error('❌ Error en la eliminación:', error);
          this.loading = false;
          this.cdr.markForCheck();
          alert('❌ Error al eliminar la película');
        }
      });
    }
  }

  testMovie(movie: Movie): void {
    console.log('🔍 Propiedades de la película:', Object.keys(movie));
    console.log('🔍 Objeto completo:', movie);
    console.log('🔍 _id:', movie.id);
    console.log('🔍 id:', (movie as any).id);
    console.log('🔍 ID (cualquier propiedad que termine en id):',
      Object.keys(movie).filter(k => k.toLowerCase().includes('id')));
  }

  closeForm(): void {
    this.showForm = false;
    this.selectedMovie = null;
  }
}