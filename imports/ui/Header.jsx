import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import LoginButtons from './LoginButtons';
import routes from './constants';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar({title}) {
    const classes = useStyles();

    return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton href={routes.welcome} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <Button color="inherit"> <LoginButtons/> </Button>
                </Toolbar>
            </AppBar>
    );
}