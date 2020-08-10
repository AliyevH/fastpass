import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, Redirect} from "react-router-dom";
import {Container, Form, Button} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {
    signin,
    changeLoginForm,
    setLoginFormErrors,
} from "../../actions/Auth";
import CircularProgress from "../../components/circularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import {SIGNIN_ERROR} from "../../constants/ActionTypes";

function TransitionUp(props) {
    return <Slide {...props} direction="up"/>;
}

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let [timer, setTimer] = useState(null);
    const auth = useSelector(state => state.auth);
    const {username, password, formErrors, isLoading, access_token, authUser, loginError} = auth;

    const handleChange = (e) => {
        dispatch(changeLoginForm({name: e.target.name, value: e.target.value}));
    };

    const allowSubmit = () => {
        const {username, password} = auth;
        let formErrors = {
            username: {
                error: false,
                message: ""
            },
            password: {
                error: false,
                message: ""
            }
        };

        formErrors.username.error = username.trim() === "";
        formErrors.password.error = password.trim() === "";

        formErrors.username.message = formErrors.username.error ? "Username can not be blank." : "";
        formErrors.password.message = formErrors.password.error ? "Password can not be blank." : "";

        dispatch(setLoginFormErrors(formErrors));
        return Object.values(formErrors).find(field => field.error === true) === undefined;
    };

    useEffect(() => {
        const tmpTimer = setTimeout(() => {
            dispatch({
                type: SIGNIN_ERROR, payload: {error: false, message: ""}
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
            const {username, password} = auth;
            dispatch(signin({username, password, history}));
        }
    };

    if(access_token && authUser){
        return <Redirect to={'/app/dashboard'} />
    }

    return (
        <Container>
            <Row>
                <div className="app-login-component">
                    <h2 className="mb-2 app-signin-head">Signin
                        {
                            isLoading ? <CircularProgress/> : null
                        }
                    </h2>
                    <Form onSubmit={(e) => {
                        onSubmit(e)
                    }} method="post">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control name="username" value={username} onChange={(e) => handleChange(e)} type="text"
                                          placeholder="Enter username"/>
                            {formErrors.username.error ? <Form.Text className="text-muted error">
                                {formErrors.username.message}
                            </Form.Text> : null
                            }
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" value={password} onChange={(e) => {
                                handleChange(e)
                            }}
                                          type="password" placeholder="Password"/>
                            {formErrors.password.error ? <Form.Text className="text-muted error">
                                {formErrors.password.message}
                            </Form.Text> : null
                            }
                        </Form.Group>
                        <Button disabled={isLoading} variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </div>
                {
                    loginError.error ? <Snackbar
                        open={true}
                        TransitionComponent={TransitionUp}
                        message={loginError.message}
                    /> : null
                }

            </Row>
        </Container>
    );
};

export default Login
