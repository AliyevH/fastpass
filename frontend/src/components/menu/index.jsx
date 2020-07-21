import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';

function Index() {
    const menuValue = useSelector(state => state.headerReducer.menuValue)
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
        </div>
    )
}

export default Index
