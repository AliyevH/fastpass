import React, {Component, useEffect, useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect, useDispatch, useSelector} from 'react-redux';
import axios from '../utils/Api';
import '../assets/css/main.css';
import MainApp from '../route/HomePage/index';
import SignIn from '../route/AuthPages/Login';
import {forceQuit, setInitUrl} from '../actions/Auth';
import asyncComponent from '../utils/asyncComponent';
import CircularProgress from "../components/circularProgress";

const RestrictedRoute = ({component: Component, authUser, token, ...rest}) => {
    const dispatch = useDispatch();
    const [auth, setAuth] = useState(false);
    const [isTokenValidated, setIsTokenValidated] = useState(false);
    const accessToken = useSelector(state => state.auth.access_token);
    useEffect(() => {
        if (accessToken) {
            axios.get(`users?access=${accessToken}`)
                .then((res) => {
                    if (res.status === 200 && res.data.length > 0) {
                        setAuth(true);
                    } else {
                        /*Fake 401 un authorization error*/
                        dispatch(forceQuit());
                        setAuth(false);
                        localStorage.clear();
                    }
                })
                .catch((err) => {
                    setAuth(false);
                    localStorage.clear();
                })
                .then(() => setIsTokenValidated(true));
        } else {
            setIsTokenValidated(true);
        }
    }, []);

    if (!isTokenValidated) return <CircularProgress/>;

    return (
        <Route
            {...rest}
            render={props => {
                return (
                    auth
                        ? <Component {...props} />
                        : <Redirect
                            to={{
                                pathname: '/signin',
                                state: {from: props.location}
                            }}
                        />
                )
            }}
        />)
};


class App extends Component {

    componentWillMount() {
        if (this.props.initURL === '') {
            this.props.setInitUrl(this.props.history.location.pathname);
        }
    }

    render() {
        const {match, location, access_token, authUser,} = this.props;
        if (location.pathname === '/') {
            if (access_token === null || !authUser) {
                return (<Redirect to={'/signin'}/>);
            } else {
                return (<Redirect to={'/app/dashboard'}/>);
            }
        }

        return (
            <div className="app-main">
                <Switch>
                    <RestrictedRoute path={`/app`} authUser={authUser} token={access_token}
                                     component={MainApp}/>
                    <Route path='/signin' component={SignIn}/>
                    <Route
                        component={asyncComponent(() => import('../route/ErrorPage'))}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = ({auth}) => {
    const {authUser, token, initURL} = auth;
    return {authUser, token, initURL};
};

export default connect(mapStateToProps, {setInitUrl})(App);