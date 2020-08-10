import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../../route/Dashboard/index.jsx';
import ProfilePage from '../../route/Profile/index.jsx';
// import Register from '../../route/AuthPages/Register';
// import Login from '../../route/AuthPages/Register';
import Header from '../../components/header';
import SearchPanel from '../../components/searchPanel';
import ErrorPage from '../../route/ErrorPage';
import Menu from '../../components/menu';
import { useSelector } from 'react-redux';


const MainApp = () => {
    const menuValue = useSelector(state => state.headerReducer.menuValue);
    return (
        <>
            <Header />
            <Menu />
            <SearchPanel />
            <div className={menuValue ? "active_navbar" : "pages_block"}>
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/profile"  component={ProfilePage} />
                    <Route component={ErrorPage}></Route>
                </Switch>
            </div>
        </>
    );
}

export default MainApp;
