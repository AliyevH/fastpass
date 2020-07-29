import React from 'react';
import './style.css';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';
function Index() {
    const menuValue = useSelector(state => state.headerReducer.searchPanelValue)
    return (
        <div className={menuValue ? "search_panel" : "search_panel close_search"}>
            <TextField placeholder="Search" />
        </div>
    );
}
export default Index

