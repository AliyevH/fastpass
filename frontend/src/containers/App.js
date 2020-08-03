import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from "../route/AuthPages/Login";
import Register from "../route/AuthPages/Register";
import { useSelector, useDispatch } from 'react-redux';
import axios from '../utils/Api';
import CircularProgress from "../components/Proggress/CircularProgress";
import MainApp from "../route/HomePage";

const RestrictedRoute = ({ component: Component, authUser, token, ...rest }) => {
    console.log("restrict")
    const dispatch = useDispatch();
    const [auth, setAuth] = useState(false);
    const [tokenIsValid, setTokenIsValid] = useState(false);
    const accesToken = useSelector(state => state.authReducer.token);
    useEffect(() => {
        setTokenIsValid(true);
        if (accesToken) {
            axios.get(`users/${1}`)
                .then(res => {
                    if (res.status === 200) {
                        setAuth(true);
                        // dispatch(getUser())
                    }
                })
                .catch(err => {
                    setAuth(false);
                    localStorage.clear();
                })
                .then(() => setTokenIsValid(true));
        } else {
            setTokenIsValid(true);
        }
    }, [])
    if (!tokenIsValid) return <CircularProgress />;
    return (
        <Route
            {...rest}
            render={props => {
                return (
                    auth ? <Component {...props} /> : <Redirect
                        to={{
                            pathname: '/signin'
                        }}
                    />
                )
            }}
        />
    )
}


const App = () => {

    const token = useSelector(state => state.authReducer.token);
    const authUser = useSelector(state => state.authReducer.authUser);
    if (!token || !authUser) {
        // return <Redirect to={'/signin'} />
    }
    const restrictedConfig = {
        token,
        authUser
    }
    return (
        <div className="main-container">
            <Switch>
                <RestrictedRoute path='/app' token={token} authUser={authUser} component={MainApp} />
                <Route path='/signin' component={Login} />
                <Route path='/signup' component={Register} />
            </Switch>
        </div>
    )
}

export default App;