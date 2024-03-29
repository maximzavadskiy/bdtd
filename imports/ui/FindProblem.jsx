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
import Button from '@material-ui/core/Button';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Problems, { ProblemType} from '../api/Problems';
import moment from 'moment';
import PropTypes from 'prop-types';
import routes from './constants';

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
        marginLeft: theme.spacing(2),
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    advicesIntro: {
        marginBottom: theme.spacing(4)
    },
    welcome: {
        marginBottom: theme.spacing(4)
    }
}));



function FindProblem({ user, problems }) {
        const classes = useStyles();
        const problemListItems = (myOnly) => {
            const filteredProblems = myOnly ?
             _.filter(problems, ["user._id", _.get(user,"_id")]):
                _.filter(problems, (problem) => _.get(problem, "user._id") !== _.get(user, "_id"));
            return _.map(_.reverse(_.sortBy(filteredProblems, ['createdAt'])), (problem) => {
            return(
            <ListItem button key={problem._id} onClick={() => document.location = routes.problemDetail(problem._id)}>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={problem.title} secondary={`${moment(problem.createdAt).fromNow()}`} />
            </ListItem>
        )}) 
            }
        return (
            <React.Fragment>
                <CssBaseline />
                <Header title="Give Advice" />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        {_.isEmpty(user) && <Typography variant="h3" className={classes.welcome}>
                            Welcome to BeenThereDoneThat. Please Sign In to unlock all features.
                                </Typography>}
                        <React.Fragment> 
                            <Typography variant="h6">
                                Advice Requests
                                <Button
                                    href={routes.submitProblem}
                                    variant="outlined"
                                    color="primary"
                                    className={classes.button}
                                    >
                                        Add
                                </Button>
                            </Typography>
                            <Typography className={classes.advicesIntro}>
                                Advice Requests is how you get in touch with potential mentors. Interested mentors 'like' their favourite advice requests and we connect them via email.
                            </Typography>


                            <Typography variant="subtitle1">
                                My Advice Requests
                            </Typography>
                            
                            <List className={classes.root}>
                                {problemListItems(true)}
                            </List> 
                            <Typography variant="subtitle1">
                                Other Advice Requests
                            </Typography>
                            <List className={classes.root}>
                                {problemListItems()}
                            </List> 
                        </React.Fragment>
                    </Paper>
                    <Copyright />
                </main>
            </React.Fragment>
        );
}

FindProblem.propTypes = {
    user: PropTypes.object,
    problems: PropTypes.arrayOf(ProblemType)
}

export default FindProblemContainer = withTracker(() => {
    return {
        user: Meteor.user(),
        problems: Problems.find().fetch()
    };
})(FindProblem);
