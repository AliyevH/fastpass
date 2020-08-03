import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import {signOut} from '../../actions/authActions';

function Index() {
    const menuValue = useSelector(state => state.headerReducer.menuValue)
    const dispatch = useDispatch();
    return (
        <div className={menuValue ? "menu" : "menu close_menu"}>
            <ul className="menu_inner">
                <li>
                    <Link to="/">
                        <Button>
                            <i className="material-icons">dashboard</i>
                                dashboard
                            </Button>
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <Button>
                            <i className="material-icons">account_box</i>
                                profile
                            </Button>
                    </Link>
                </li>
            </ul>
            <div className="logout">
                <Button onClick={() => dispatch(signOut())}><span className="material-icons">login</span>Logout</Button>
            </div>
        </div>
    )
}

export default Index
