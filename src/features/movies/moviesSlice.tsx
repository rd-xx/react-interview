import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieType } from '../../utils/movies';
import { RootState } from '../../app/store';

export interface MoviesState {
  value: MovieType[];
}

const initialState: MoviesState = {
  value: []
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<MovieType[]>) => {
      state.value = action.payload;
    },
    addMovie: (state, action: PayloadAction<MovieType>) => {
      state.value.push(action.payload);
    },
    removeMovie: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((movie) => movie.id !== action.payload);
    }
  }
});

export const { setMovies, addMovie, removeMovie } = moviesSlice.actions;
export const selectMovies = (state: RootState) => state.movies.value;
export default moviesSlice.reducer;
