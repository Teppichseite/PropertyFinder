import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import ReplayIcon from '@material-ui/icons/Replay';
import { Container } from '@material-ui/core';
import '../public/style.css';

export default class Frame extends React.Component {

    render(){
        return (
            <div className="outer-frame">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" >
                            Limehome Project
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container className="inner-frame">
                    {this.props.children}
                </Container>
                <Fab 
                    className = "reload-fab"
                    variant="extended" 
                    color="primary" 
                    onClick={this.props.onClick}
                    aria-label="add">
                    <ReplayIcon />
                    Reload
                </Fab>
            </div>
        );
    }

}