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



function SubmitProblem({user}) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Header title="Find a Mentor"/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                        {_.isEmpty(user) && <Typography variant="h6">
                                You need to Sign In to access this page
                            </Typography> }
                        {!_.isEmpty(user) && <React.Fragment>
                            <Typography variant="h6">
                                Describe Your Problem
                            </Typography>
                            <Typography gutterBottom>
                                Mentors will choose mentees based on problem description 
                            </Typography> <Typography gutterBottom> </Typography>

                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const {title, description, reason, actions }  = e.target
                                Problems.insert({
                                    createdAt: new Date(),
                                    title: title.value,
                                    description: description.value,
                                    reason: reason.value,
                                    actions: actions.value,
                                    user: user
                                    // title: "Balancing prototype with user interivews",
                                    // description: "I am product lead in the company. We are super early stage & many things are uncertain. However team is eager to start. How can we utilize both developers and designers without wasting too much effort? My fear is that if we start building code now, most of it will be thrown out and team will be discouraged.",
                                    // user: null // TODO assign sum user
                                })
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
                            </Grid>

                            <div className={classes.buttons}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                >
                                    Submit Mentor Request
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
    };
})(SubmitProblem);
