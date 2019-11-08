import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Header from './Header';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
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
import { FlowRouter } from 'meteor/kadira:flow-router';
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
    section: {
        marginBottom: theme.spacing(3),
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



function ProblemDetail({ user, problem, users }) {
        const classes = useStyles();
        const profile =_.get( _.find(users, { _id: _.get(problem, 'user._id') }), 'profile');
        return (
            <React.Fragment>
                <CssBaseline />
                <Header title="Give Advise" />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        {(_.isEmpty(user) || _.isEmpty(users)) && <Typography variant="h6">
                            You need to Sign In to access this page
                                </Typography>}
                        {!_.isEmpty(user) && <React.Fragment>
                            <Typography variant="h6">
                                {problem.title}
                            </Typography>
                            <section className={classes.section}>
                                <Typography variant="body1" color='textSecondary' gutterBottom>
                                    {`${moment(problem.createdAt).fromNow()}. By ${_.get(profile, 'name')}, ${_.get(profile, 'jobTitle')}`}
                                </Typography>
                                <Typography >
                                    {problem.description}
                                </Typography>
                            </section>

                            <section className={classes.section}>
                                <Typography variant="button"> Why it occurs </Typography>
                                <Typography >
                                    {problem.reason}
                                </Typography> 
                            </section>

                            <section className={classes.section}>
                                <Typography variant="button"> Actions tried </Typography>
                                <Typography>
                                    {problem.actions}
                                </Typography>
                            </section>

                            {/* ={`mailto:${problem.user.emails[0].address}?subject=BeenThereDoneThat - I may have an advise for you`} */}
                            <Button color="primary" fullWidth variant="contained" onClick={
                                ()=> {
                                    Meteor.call(
                                        'sendMail',
                                        problem.user._id, // to
                                        user._id, //from
                                        `Advisor Responded To : "${problem.title}"`,
                                        "<p> Hi, </p>" +
                                        `<p> ${_.get(user, 'profile.name', 'Someone')} is exressed interest to give you advise. Reply to this email to get in touch with him. You can also ignore this email - she will never know that was you. </p>` +
                                        // "<p> </p>" +
                                        // "<p> <b> Requested by </b> </p>" +
                                        // `<p> ${firstName.value} ${lastName.value} , ${jobTitle.value} </p>` +
                                        // "<p> </p>" +
                                        // "<p> <b> Description of a problem </b> </p>" +
                                        // `<p> ${description.value} </p>` +
                                        // "<p> </p>" +
                                        // "<p> <b> Why a problem occurs </b> </p>" +
                                        // `<p> ${reason.value} </p>` +
                                        // "<p> <b> Actions tried </b> </p>" +
                                        // `<p> ${actions.value} </p>` +
                                        // "<p> </p>" +
                                        // "<p> </p>" +
                                        // "<p> Accept by repliying to this email </p>" +
                                        "<p> </p>" +
                                        "<p> Have Fun Chatting, </p>" +
                                        "<p> Maxim Zavadskiy, BeenThereDoneThat Product Guy </p>"
                                    );
                                    document.location = routes.submitHiSuccess
                                }
                            } > Send 'Hi' </Button>
                        </React.Fragment>}
                    </Paper>
                    <Copyright />
                </main>
            </React.Fragment>
        );
}

ProblemDetail.propTypes = {
    user: PropTypes.object,
    problem: ProblemType
}

export default ProblemDetailContainer = withTracker(() => {
    const id = FlowRouter.getParam('_id');
    return {
        problem: Problems.findOne(id),
        user: Meteor.user(),
        users: Meteor.users.find().fetch()
    };
})(ProblemDetail);
