import getMovies, { formatCategories, MovieType } from '../../utils/movies';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import TablePagination from '@mui/material/TablePagination';
import { setMovies, selectMovies } from './moviesSlice';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import MovieCard from '../../components/Card';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Trans } from '@lingui/macro';
import Form from './Form';

export default function Movies() {
  const movies = useAppSelector(selectMovies),
    dispatch = useAppDispatch(),
    [loaded, setLoaded] = useState(false),
    [availableCategories, setAvailableCategories] = useState<string[]>([]),
    [selectedCategories, setSelectedCategories] = useState<string[]>([]),
    [selectedMovies, setSelectedMovies] = useState<MovieType[]>([]),
    [openDialog, setOpenDialog] = useState(false),
    [page, setPage] = useState(0),
    [limit, setLimit] = useState(12);

  useEffect(() => {
    async function fetchMovies() {
      const fetchedMovies = await getMovies();
      dispatch(setMovies(formatCategories(fetchedMovies)));
      setSelectedMovies(fetchedMovies);
      setLoaded(true);
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    setAvailableCategories([...new Set(movies.map((movie) => movie.category))]);

    if (selectedCategories.length === 0) setSelectedMovies(movies);
    else
      setSelectedMovies(
        movies.filter((movie) => selectedCategories.includes(movie.category))
      );
  }, [selectedCategories, movies]);

  if (movies.length === 0 && loaded)
    return (
      <Typography variant="h5" align="center">
        <Trans>You deleted every movie.</Trans>
      </Typography>
    );

  return (
    <>
      {/* Filter bar */}
      <Grid
        container
        spacing={{ xs: 1, sm: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ marginBottom: '32px', alignItems: 'center' }}
      >
        {!loaded ? (
          <Grid>
            <Skeleton animation="wave" variant="rectangular" height={70} />
          </Grid>
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
              <Button
                variant="contained"
                color="success"
                size="large"
                sx={{ width: '100%' }}
                onClick={() => setOpenDialog(true)}
              >
                <Trans>New movie</Trans>
              </Button>
              <Form open={openDialog} setOpen={setOpenDialog} />
            </Grid>
          </>
        )}
      </Grid>
      {/* Cards */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {movies.length === 0
          ? showCardSkeletons()
          : showMovies(selectedMovies, page, limit)}
      </Grid>
      {/* Pagination and options */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <TablePagination
          component="div"
          count={selectedMovies.length}
          page={page}
          rowsPerPage={limit}
          onPageChange={(_, newPage) => {
            setPage(newPage);
          }}
          onRowsPerPageChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(0);
          }}
          rowsPerPageOptions={[4, 8, 12, { label: 'All', value: -1 }]}
        />
      </Grid>
    </>
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
    end = start + limit;

  return movies.slice(start, end).map((movie) => (
    <Grid key={movie.id} xs={4}>
      <MovieCard {...movie} />
    </Grid>
  ));
}
