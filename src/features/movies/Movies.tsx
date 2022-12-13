import { useAppDispatch, useAppSelector } from '../../app/hooks';
import getMovies, { MovieType } from '../../utils/movies';
import { setMovies, selectMovies } from './moviesSlice';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import MovieCard from '../../components/Card';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Bottom from './Bottom';

export default function Movies() {
  const movies = useAppSelector(selectMovies),
    dispatch = useAppDispatch(),
    [loaded, setLoaded] = useState(false),
    [availableCategories, setAvailableCategories] = useState<string[]>([]),
    [selectedCategories, setSelectedCategories] = useState<string[]>([]),
    [selectedMovies, setSelectedMovies] = useState<MovieType[]>([]),
    [page, setPage] = useState(0),
    [limit, setLimit] = useState(12);

  useEffect(() => {
    async function fetchMovies() {
      const fetchedMovies = await getMovies();
      dispatch(setMovies(fetchedMovies));
      setSelectedMovies(fetchedMovies);
      setLoaded(true);
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    setAvailableCategories([...new Set(movies.map((movie) => movie.category))]);
  }, [movies]);

  useEffect(() => {
    if (selectedCategories.length === 0) setSelectedMovies(movies);
    else
      setSelectedMovies(
        movies.filter((movie) => selectedCategories.includes(movie.category))
      );
  }, [selectedCategories]);

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
          : showMovies(selectedMovies, page, limit)}
      </Grid>
      <Bottom
        total={selectedMovies.length}
        page={page}
        limit={limit}
        handlePageChange={(_, newPage) => {
          setPage(newPage);
        }}
        handleLimitChange={(e) => {
          setLimit(Number(e.target.value));
          setPage(0);
        }}
      />
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

function showCardSkeletons() {
  return Array.from(new Array(10)).map((_, i) => (
    <Grid key={i} xs={4}>
      <Skeleton animation="wave" variant="rectangular" height={140} />
    </Grid>
  ));
}

function showMovies(movies: MovieType[], page: number, limit: number) {
  const start = page * limit,
    end = start + limit + 1;

  return movies.slice(start, end).map((movie) => (
    <Grid key={movie.id} xs={4}>
      <MovieCard {...movie} />
    </Grid>
  ));
}
