import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';
import routes from './constants';
import Problems from '../api/Problems';

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
}));



function SubmitProblem({user, users}) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Header title="Find an Advisor"/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                        {_.isEmpty(user) && <Typography variant="h6">
                                You need to Sign In to access this page
                            </Typography> }
                        {!_.isEmpty(user) && <React.Fragment>
                            <Typography variant="h6">
                                Describe Your Problem
                            </Typography>

                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const {title, description, reason, actions, firstName, lastName, linkedin, aboutMe }  = e.target
                                const problemId = Problems.insert({
                                    createdAt: new Date(),
                                    title: title.value,
                                    description: description.value,
                                    reason: reason.value,
                                    actions: actions.value,
                                    user: user,
                                    linkedin: linkedin.value,
                                    aboutMe: aboutMe.value
                                })
                                Meteor.users.update(user._id, {$set: {
                                    profile: {
                                        name: `${firstName.value} ${lastName.value}`,
                                    }
                                }})
                            const getEmail = (userObj) => userObj.emails[0].address
                            
                            Meteor.call(
                                'sendRequestToAdvisors',
                                user._id,
                                `Max from BeenThereDoneThat <maximzavadskiy@gmail.com>`,
                                `New Request for Advice: "${title.value}"`,
                                "<p> Hi, </p>" +
                                "<p> Someone needs an advice on this: </p>" +
                                "<p> </p>" +
                                `<p> <q> ${description.value} </q> </p>` +
                                "<p> </p>" +
                                "<p> </p>" +
                                `<p> <a href=${window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + routes.problemDetail(problemId)}> Details & Respond </a> </p>` +
                                "<p> </p>" +
                                "<p> Happy advising, </p>" +
                                "<p> Maxim Zavadskiy, BeenThereDoneThat Product Guy </p>"
                            );
                            
                                document.location = routes.submitProblemSuccess
                            }}>
                            <Grid container spacing={3}>
                                
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="title"
                                        name="title"
                                        label="Problem title"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="description"
                                        name="description"
                                        label="Problem description"
                                        multiline
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="reason"
                                        name="reason"
                                        label="Why do you think the problem occurs?"
                                        multiline
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="actions"
                                        name="actions"
                                        label="What have you tried to solve it?"
                                        multiline
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        fullWidth
                                        autoComplete="fname"
                                    />

                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lastName"
                                        label="Last name"
                                        fullWidth
                                        autoComplete="lname"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        type="url"
                                        id="linkedin"
                                        name="linkedin"
                                        label="Your Linkedin URL (recommended, increases response chances)"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        type="url"
                                        id="aboutMe"
                                        name="aboutMe"
                                        label="Tell shortly about yourself (recommended, increases response chances)"
                                        fullWidth
                                        multiline
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography> Your email will be shared only with interested potential mentors </Typography>
                                </Grid>
                            </Grid>

                            <div className={classes.buttons}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                >
                                    Submit Advice Request
                                </Button>
                            </div>
                        </form>
                    </React.Fragment>}
                </Paper>
                <Copyright />
            </main>
        </React.Fragment>
    );
}

export default SubmitProblemContainer = withTracker(() => {
    return {
        user: Meteor.user(),
        users: Meteor.users.find().fetch()
    };
})(SubmitProblem);
