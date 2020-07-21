import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import HomePage from './route/Dashboard/index.jsx';
import ProfilePage from './route/Profile/index.jsx';
import Register from './route/AuthPages/Register';
import Header from './components/header';
import SearchPanel from './components/searchPanel';
import ErrorPage from './route/ErrorPage';
import Menu from './components/menu';
import { useSelector } from 'react-redux';
// import Login from './route/AuthPages/Login.jsx';

function App() {
  const menuValue = useSelector(state => state.headerReducer.menuValue);
  // const access = useSelector(state => state.authReducer.access);
  return (
    <BrowserRouter>
      {/* {
        access ?
          <>
            <Header />
            <Menu />
            <SearchPanel />
          </> : null
      } */}
      <Header />
      <Menu />
      <SearchPanel />
      <div className={menuValue ? "active_navbar" : "pages_block"}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/register" exact component={Register} />
          <Route path="/profile" exact component={ProfilePage} />
          <Route component={ErrorPage}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
