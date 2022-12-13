import { useAppDispatch, useAppSelector } from '../../app/hooks';
import DialogContentText from '@mui/material/DialogContentText';
import { TransitionProps } from '@mui/material/transitions';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useMediaQuery, useTheme } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import { addMovie, selectMovies } from './moviesSlice';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import { formatCategories, getLatestId } from '../../utils/movies';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';

type FormProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Form(props: FormProps) {
  const dispatch = useAppDispatch(),
    movies = useAppSelector(selectMovies),
    theme = useTheme(),
    fullScreen = useMediaQuery(theme.breakpoints.down('md')),
    [buttonLoading, setButtonLoading] = useState(false),
    [shouldDisable, setShouldDisable] = useState(true),
    [title, setTitle] = useState(''),
    [category, setCategory] = useState(''),
    [openSuccessToast, setOpenSuccessToast] = useState(false),
    [openErrorToast, setOpenErrorToast] = useState(false);

  useEffect(() => {
    if (title !== '' && category !== '') setShouldDisable(false);
  }, [title, category]);

  function handleClick() {
    setTitle('');
    setCategory('');
    props.setOpen(!props.open);
  }

  function handleSuccessToast() {
    setOpenSuccessToast(!openSuccessToast);
  }

  function handleErrorToast() {
    setOpenErrorToast(!openErrorToast);
  }

  async function handleAddMovie() {
    async function add() {
      if (movies.find((movie) => movie.title === title)) {
        setButtonLoading(false);
        setShouldDisable(true);
        handleErrorToast();
        return;
      }

      // I have to use this function because the movies array do not include deleted movies
      const latestId = await getLatestId(),
        movieObj = {
          id: latestId + 1,
          title,
          category,
          likes: 0,
          dislikes: 0
        };
      dispatch(addMovie(formatCategories([movieObj])[0]));
      setButtonLoading(false);
      handleSuccessToast();
      handleClick();
    }

    setButtonLoading(true);
    add();
  }

  return (
    <>
      {/* Dialog */}
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClick}
        fullScreen={fullScreen}
      >
        <DialogTitle>Ajouter un film</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Remplissez les champs ci-dessous pour ajouter un film à votre liste.
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Titre"
            type="text"
            variant="filled"
            sx={{ marginTop: '16px' }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Catégorie"
            type="text"
            variant="filled"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClick}>
            Annuler
          </Button>
          <LoadingButton
            color="success"
            onClick={handleAddMovie}
            disabled={shouldDisable}
            loading={buttonLoading}
            loadingPosition="start"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Ajouter
          </LoadingButton>
        </DialogActions>
      </Dialog>
      {/* Error alert */}
      <Snackbar
        open={openErrorToast}
        autoHideDuration={4000}
        onClose={handleErrorToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="error">Le film existe déjà !</Alert>
      </Snackbar>
      {/* Success toast */}
      <Snackbar
        open={openSuccessToast}
        autoHideDuration={4000}
        onClose={handleSuccessToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success">Le film a bien été ajouté !</Alert>
      </Snackbar>
    </>
  );
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
