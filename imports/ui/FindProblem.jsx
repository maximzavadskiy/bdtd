import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Header from './Header';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Problems, { ProblemType} from '../api/Problems';
import moment from 'moment';
import PropTypes from 'prop-types';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                BeenThereDoneThat
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));



function FindProblem({ user, problems, users }) {
        if(_.isEmpty(users)) return null
        const classes = useStyles();
        const problemListItems = _.map(problems, (problem) => {
            // debugger;
            const profile = _.find(users, { _id: problem.user._id }).profile;
            return(
            <ListItem button key={problem._id}>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={problem.title} secondary={`${moment(problem.createdAt).fromNow()}. By ${_.get(profile, 'name')}, ${_.get(profile, 'jobTitle')}`} />
            </ListItem>
        )}) 
        return (
            <React.Fragment>
                <CssBaseline />
                <Header title="Give Advise" />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        {_.isEmpty(user) && <Typography variant="h6">
                            You need to Sign In to access this page
                                </Typography>}
                        {!_.isEmpty(user) && <React.Fragment> 
                            <Typography variant="h6">
                                Advisor Requests
                            </Typography>
                            <List className={classes.root}>
                                {problemListItems}
                            </List> 
                        </React.Fragment>}
                    </Paper>
                    <Copyright />
                </main>
            </React.Fragment>
        );
}

FindProblem.propTypes = {
    user: PropTypes.object.isRequired,
    problems: PropTypes.arrayOf(ProblemType)
}

export default FindProblemContainer = withTracker(() => {
    return {
        user: Meteor.user(),
        problems: Problems.find().fetch(),
        users: Meteor.users.find().fetch()
    };
})(FindProblem);
