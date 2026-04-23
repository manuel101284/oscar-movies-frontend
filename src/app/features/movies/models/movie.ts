export interface Movie {
  id?: string;
  titleMovie: string;
  directorMovie: string;
  yearMovie: number;
  durationMovie: number;
  actressMovie: string;
  actorMovie: string;
  posterUrlMovie: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Tipo para crear/actualizar (sin _id)
export type MovieCreate = Omit<Movie, '_id'>;

//Tipo para filtros de busqueda
export interface MovieFilters {
  titleMovie?: string;
  directorMovie?: string;
  yearMovie?: number;
  durationMovie?: number;
  actressMovie?: string;
  actorMovie?: string;
}