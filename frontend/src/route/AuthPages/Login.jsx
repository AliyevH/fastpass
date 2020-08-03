import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import { useSelector, useDispatch } from 'react-redux';
// import { handleChange, accessUser } from '../../actions/authActions';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {useHistory} from 'react-router';
// import Alert from '@material-ui/lab/Alert';

import {useSelector, useDispatch} from "react-redux";
import {
    signIn, handleChange,
} from "../../actions/authActions";

import CircularProgress from "../../components/Proggress/CircularProgress";

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
    const history = useHistory();
    const authUser = useSelector(state => state.authReducer.authUser);
    const isLoading = useSelector(state => state.authReducer.isLoading);
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })
    const [formErrors, setFormErrors] = useState({
        email: {
            error: false,
            message: ""
        },
        password: {
            error: false,
            message: ""
        }
    });

    useEffect(() => {
        authUser && history.push('/app/dashboard');
    }, [authUser]);

    const allowSubmit = () => {
        const {email, password} = userInfo;
        let errors = {
            email: {
                error: false,
                message: ""
            },
            password: {
                error: false,
                message: ""
            }
        };

        errors.email.error = email.trim() === "";
        errors.password.error = password.trim() === "";
        
        errors.email.message = errors.email.error ? "email can not be empty." : "";
        errors.password.message = errors.password.error ? "Password can not be empty." : "";
        
        setFormErrors(errors)
        return Object.values(errors).find(field => field.error === true) === undefined;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if(allowSubmit()){
            const {email, password} = userInfo;
            const requestObject = {
                email,
                password
            }
            dispatch(signIn(requestObject));
        }
    };

    const handleChange = (formObject) => {
        setUserInfo({
            ...userInfo,
            ...formObject,
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {
                    isLoading ? <CircularProgress /> : (
                        <>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">Sign in</Typography>
                        </>
                    )
                }
                <form className={classes.form} onSubmit={(e) => handleLogin(e)} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="E-mail"
                        name="email"
                        autoFocus
                        error={formErrors.email.error}
                        helperText={formErrors.email.message}
                        onChange={(e) => handleChange({[e.target.name] : e.target.value})}
                    />
                    {/* {
                        inputMessage ? <Alert severity="error">Incorrect</Alert> : null
                    } */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        error={formErrors.password.error}
                        helperText={formErrors.password.message}
                        onChange={(e) => handleChange({[e.target.name] : e.target.value})}
                    />
                    {/* {
                        inputMessage ? <Alert severity="error">Incorrect</Alert> : null
                    } */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>Sign In</Button>
                    <Grid container>
                        <Grid item xs>
                            <Link className="login_a" to="/register" variant="body2">
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