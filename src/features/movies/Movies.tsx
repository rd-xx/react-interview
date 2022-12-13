import { useAppDispatch, useAppSelector } from '../../app/hooks';
import getMovies, { MovieType } from '../../utils/movies';
import { setMovies, selectMovies } from './moviesSlice';
import { Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MovieCard from '../../components/Card';
import { useEffect, useState } from 'react';

export default function Movies() {
  const movies = useAppSelector(selectMovies),
    dispatch = useAppDispatch(),
    [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      const fetchedMovies = await getMovies();
      dispatch(setMovies(fetchedMovies));
      setLoaded(true);
    }
    fetchMovies();
  }, []);

  if (movies.length === 0 && loaded)
    return (
      <Typography variant="h5" align="center">
        Vous avez supprimé tous les films.
      </Typography>
    );

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {movies.length === 0 ? showSkeletons() : showMovies(movies)}
    </Grid>
  );
}

// Load skeletons if the movies are not loaded yet
function showSkeletons() {
  return Array.from(new Array(10)).map((_, i) => (
    <Grid key={i} xs={4}>
      <Skeleton animation="wave" variant="rectangular" height={140} />
    </Grid>
  ));
}

function showMovies(movies: MovieType[]) {
  return movies.map((movie) => (
    <Grid key={movie.id} xs={4}>
      <MovieCard {...movie} />
    </Grid>
  ));
}