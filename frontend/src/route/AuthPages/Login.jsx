import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { handleChange, accessUser } from '../../actions/authActions';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';


import './style.css';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [inputMessage, setInputMessage] = useState(false)
    const hasUser = useSelector(state => state.authReducer.hasUser);
    const userInfo = useSelector(state => state.authReducer.userInfo);

    function handleSubmit(e) {
        e.preventDefault();
        if (userInfo.username === hasUser.username.trim() && userInfo.password === hasUser.password.trim()) {
            dispatch(accessUser(true));
            setInputMessage(false)
        }
        else {
            dispatch(accessUser(false));
            setInputMessage(true)
        }
    }
    
    function inputChanged(e) {
        dispatch(handleChange({ [e.target.name]: e.target.value }))
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Sign in</Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="User name"
                        name="username"
                        autoFocus
                        onChange={inputChanged}
                    />
                    {
                        inputMessage ? <Alert severity="error">Incorrect</Alert> : null
                    }
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={inputChanged}

                    />
                    {
                        inputMessage ? <Alert severity="error">Incorrect</Alert> : null
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>Sign In</Button>
                    <Grid container>
                        <Grid item xs>
                            <Link className="login_a" href="#" variant="body2">
                                Forgot password?</Link>
                        </Grid>
                        <Grid item>
                            <Link className="login_a" to="/register" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}