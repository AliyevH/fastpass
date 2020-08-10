import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, Link } from "react-router-dom";
import {
    signin,
    changeLoginForm,
    setLoginFormErrors,
} from "../../actions/Auth";
import Alert from '@material-ui/lab/Alert';
import { CircularProgress } from '@material-ui/core';
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { SIGNIN_ERROR } from "../../constants/ActionTypes";
import './style.css'

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}


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

export default function SignIn() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    let [timer, setTimer] = useState(null);
    const auth = useSelector(state => state.auth);
    const { email, password, formErrors, isLoading, access_token, authUser, loginError } = auth;

    const handleChange = (e) => {
        dispatch(changeLoginForm({ name: e.target.name, value: e.target.value }));
    };

    const allowSubmit = () => {
        const { email, password } = auth;
        let formErrors = {
            email: {
                error: false,
                message: ""
            },
            password: {
                error: false,
                message: ""
            }
        };

        formErrors.email.error = email.trim() === "";
        formErrors.password.error = password.trim() === "";

        formErrors.email.message = formErrors.email.error ? "Email can not be blank." : "";
        formErrors.password.message = formErrors.password.error ? "Password can not be blank." : "";

        dispatch(setLoginFormErrors(formErrors));
        return Object.values(formErrors).find(field => field.error === true) === undefined;
    };

    useEffect(() => {
        const tmpTimer = setTimeout(() => {
            dispatch({
                type: SIGNIN_ERROR, payload: { error: false, message: "" }
            });
        }, 3000);
        setTimer(tmpTimer);
    }, [loginError.error]);

    useEffect(() => {
        return () => {
            timer && clearTimeout(timer);
        }
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        if (allowSubmit()) {
            const { email, password } = auth;
            dispatch(signin({ email, password, history }));
        }
    };

    if (access_token && authUser) {
        return <Redirect to={'/app/dashboard'} />
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {
                    isLoading ? <CircularProgress /> : null
                }
                <form className={classes.form} noValidate onSubmit={(e) => { onSubmit(e) }} method="post">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => handleChange(e)}
                    />

                    {
                        formErrors.email.error ? <Alert severity="error">{formErrors.email.message}</Alert> : null
                    }

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => handleChange(e)}
                    />
                    {
                        formErrors.password.error ? <Alert severity="error">{formErrors.password.message}</Alert> : null
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>Sign In</Button>
                    <div>
                        <Link to="/signup" variant="body2" className="login_a">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </div>
                </form>
            </div>
            {
                loginError.error ? <Snackbar
                    open={true}
                    TransitionComponent={TransitionUp}
                    message={loginError.message}
                /> : null
            }
        </Container>
    );
}