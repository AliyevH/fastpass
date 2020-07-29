import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import './style.css'

class index extends Component {
    render() {
        return (
            <Paper elevation={2} className="profile_page">
                <h2 className="title">User profile</h2>
                <div>
                    <p>Full name</p>
                    <p></p>
                </div>
            </Paper>
        );
    }
}

export default index;
