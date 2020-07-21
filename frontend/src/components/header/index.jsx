import React from 'react'
// import MenuIcon from '../../assets/images/icons/open-menu.svg';
// import SearchIcon from '../../assets/images/icons/search.svg';
// import { ReactSVG as Svg } from 'react-svg';
import { useDispatch, useSelector } from 'react-redux'
import { slideMenu,slideSearchPanel } from '../../actions/headerActions';
import './style.css'
import Button from '@material-ui/core/Button';

function Header() {
    
    const menuValue = useSelector(state => state.headerReducer.menuValue);
    const searchBarValue = useSelector(state => state.headerReducer.searchPanelValue);
    const dispatch = useDispatch();

    return (
        <div className="header_app" >
            <div className="title_header">
                any word
                </div>
            <div className="left_column">
                <Button onClick={() => { dispatch(slideMenu(!menuValue)) }}>
                    <i className="material-icons">view_headline</i>
                </Button>
                <h1 className="logo">FASTPASS</h1>
            </div>
            <div className="right_column">
                <Button onClick={()=>{dispatch(slideSearchPanel(!searchBarValue))}}>
                    <i className="material-icons">search</i>
                    {/* <Svg src={SearchIcon} alt="Logo" /> */}
                </Button>
            </div>
        </div>
    )
}

export default Header;
