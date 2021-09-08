/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import LockIcon from '@material-ui/icons/Lock';
import { compose } from 'redux';
import {
  Avatar,
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Notifications from 'containers/Notifications';
// import { Alert } from '@material-ui/lab';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import LoginForm from './LoginForm';
import { submit } from './actions';

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    minHeight: '100%',
    flexDirection: 'column',
    paddingBottom: 80,
    paddingTop: 80,
  },
  backButton: {
    marginLeft: theme.spacing(2),
  },
  card: {
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%',
    },
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4),
  },
  icon: {
    backgroundColor: '#F25116',
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

export function Login(props) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });
  const classes = useStyles();

  const handleSubmitSuccess = values => {
    props.dispatch(submit(values.email, values.password, props.history));
  };

  return (
    <div className={classes.root} title="Login">
      <Notifications />
      <Container maxWidth="md">
        <Box mb={8} display="flex" alignItems="center">
          <RouterLink to="/">{/* <Logo /> */}</RouterLink>
        </Box>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Avatar className={classes.icon}>
              <LockIcon fontSize="large" />
            </Avatar>
            <Typography variant="h2" color="textPrimary">
              Iniciar sesión
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Inicia sesión para acceder a nuestra plataforma
            </Typography>
            <Box mt={3}>
              <LoginForm
                onSubmitSuccess={values => handleSubmitSuccess(values)}
              />
            </Box>
            <Box my={2}>
              <Divider />
            </Box>
          </CardContent>
          <CardMedia
            className={classes.media}
            image="https://www.esan.edu.pe/apuntes-empresariales/2018/08/24/1500x844_optimizar_rutas_transporte.jpg"
            title="Cover"
          />
        </Card>
      </Container>
    </div>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Login);
