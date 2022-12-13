import { removeMovie } from '../features/movies/moviesSlice';
import CardContent from '@mui/material/CardContent';
import Favorite from '@mui/icons-material/Favorite';
import { compressNumber } from '../utils/numbers';
import { useAppDispatch } from '../app/hooks';
import { MovieType } from '../utils/movies';
import Card from '@mui/material/Card';
import { useState } from 'react';
import {
  ToggleButtonGroup,
  CardActionArea,
  ToggleButton,
  CardActions,
  Typography,
  Button
} from '@mui/material';

export default function MovieCard(props: MovieType) {
  const dispatch = useAppDispatch(),
    [likes, setLikes] = useState(props.likes),
    [dislikes, setDislikes] = useState(props.dislikes),
    [selected, setSelected] = useState('');

  function handleSelect(_: unknown, newSelected: string) {
    setSelected(newSelected);
  }

  function handleRatingButton(_: unknown, newSelected: string) {
    if (newSelected === 'like') {
      if (props.likes === likes) setLikes(likes + 1);
      else setLikes(likes - 1);
      setDislikes(props.dislikes);
    } else {
      if (props.dislikes === dislikes) setDislikes(dislikes + 1);
      else setDislikes(dislikes - 1);
      setLikes(props.likes);
    }
  }

  function handleDeleteButton() {
    dispatch(removeMovie(props.id));
  }

  return (
    <Card id={props.id}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" align="left">
            {props.title}
          </Typography>
          <Typography
            fontSize={14}
            color="text.secondary"
            align="right"
            fontStyle="italic"
          >
            {props.category}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <ToggleButtonGroup
          value={selected}
          exclusive
          onChange={handleSelect}
          size="small"
        >
          <ToggleButton value="like" onClick={handleRatingButton}>
            <Favorite fontSize="small" sx={{ mr: 1 }} />
            Aimer
          </ToggleButton>
          <ToggleButton value="dislike" onClick={handleRatingButton}>
            Disliker
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography>
          {compressNumber(likes)}/{compressNumber(dislikes)}
        </Typography>
        <Button variant="outlined" color="error" onClick={handleDeleteButton}>
          Supprimer
        </Button>
      </CardActions>
    </Card>
  );
}
