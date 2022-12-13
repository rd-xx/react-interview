import { useAppDispatch, useAppSelector } from '../../app/hooks';
import getMovies, { MovieType } from '../../utils/movies';
import { setMovies, selectMovies } from './moviesSlice';
import Grid from '@mui/material/Unstable_Grid2';
import MovieCard from '../../components/Card';
import { useEffect, useState } from 'react';
import {
  Autocomplete,
  Typography,
  TextField,
  Skeleton,
  Button
} from '@mui/material';

export default function Movies() {
  const movies = useAppSelector(selectMovies),
    dispatch = useAppDispatch(),
    [loaded, setLoaded] = useState(false),
    [availableCategories, setAvailableCategories] = useState<string[]>([]),
    [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      const fetchedMovies = await getMovies();
      dispatch(setMovies(fetchedMovies));
      setLoaded(true);
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    setAvailableCategories([...new Set(movies.map((movie) => movie.category))]);
  }, [movies]);

  if (movies.length === 0 && loaded)
    return (
      <Typography variant="h5" align="center">
        Vous avez supprimé tous les films.
      </Typography>
    );

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          marginBottom: '32px',
          alignItems: 'center'
        }}
      >
        {movies.length === 0 ? (
          showFilterBarSkeleton()
        ) : (
          <>
            <Grid key="autocomplete" xs={10.7}>
              <Autocomplete
                id="categories"
                multiple
                options={availableCategories}
                onChange={(_, value) => setSelectedCategories(value)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid key="btn" xs>
              {/* WIP */}
              <Button
                variant="contained"
                color="success"
                size="large"
                sx={{ width: '100%' }}
              >
                Nouveau film
              </Button>
            </Grid>
          </>
        )}
      </Grid>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {movies.length === 0
          ? showCardSkeletons()
          : showMovies(movies, selectedCategories)}
      </Grid>
    </>
  );
}

function showFilterBarSkeleton() {
  return (
    <Grid key={0} xs>
      <Skeleton animation="wave" variant="rectangular" height={70} />
    </Grid>
  );
}

// Load skeletons if the movies are not loaded yet
function showCardSkeletons() {
  return Array.from(new Array(10)).map((_, i) => (
    <Grid key={i} xs={4}>
      <Skeleton animation="wave" variant="rectangular" height={140} />
    </Grid>
  ));
}

function showMovies(movies: MovieType[], options: string[]) {
  return movies.map((movie) => {
    if (options.length && !options.includes(movie.category)) return null;

    return (
      <Grid key={movie.id} xs={4}>
        <MovieCard {...movie} />
      </Grid>
    );
  });
}
