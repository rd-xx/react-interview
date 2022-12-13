const movies = [
  {
    id: '1',
    title: 'Oceans 8',
    category: 'Comedy',
    likes: 4,
    dislikes: 1
  },
  {
    id: '2',
    title: 'Midnight Sun',
    category: 'Comedy',
    likes: 2,
    dislikes: 0
  },
  {
    id: '3',
    title: 'Les indestructibles 2',
    category: 'Animation',
    likes: 3,
    dislikes: 1
  },
  {
    id: '4',
    title: 'Sans un bruit',
    category: 'Thriller',
    likes: 6,
    dislikes: 6
  },
  {
    id: '5',
    title: 'Creed II',
    category: 'Drame',
    likes: 16,
    dislikes: 2
  },
  {
    id: '6',
    title: 'Pulp Fiction',
    category: 'Thriller',
    likes: 11,
    dislikes: 3
  },
  {
    id: '7',
    title: 'Pulp Fiction',
    category: 'Thriller',
    likes: 12333,
    dislikes: 32
  },
  {
    id: '8',
    title: 'Seven',
    category: 'Thriller',
    likes: 2,
    dislikes: 1
  },
  {
    id: '9',
    title: 'Inception',
    category: 'Thriller',
    likes: 2,
    dislikes: 1
  },
  {
    id: '10',
    title: 'Gone Girl',
    category: 'Thriller',
    likes: 22,
    dislikes: 12
  }
];

export type MovieType = typeof movies[0];
export default async function getMovies() {
  return new Promise<MovieType[]>(
    (resolve) => setTimeout(resolve, 2000, movies) // changed 100 to 1000 so it's easier to see the skeleton
  );
}

export async function getLatestId() {
  const m = await getMovies();
  return m[m.length - 1].id;
}

export function formatCategories(input: MovieType[]) {
  return input.map((movie) => ({
    ...movie,
    category:
      movie.category.charAt(0).toUpperCase() +
      movie.category.slice(1).toLowerCase()
  }));
}
