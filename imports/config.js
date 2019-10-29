import { Accounts } from 'meteor/accounts-base';
Accounts.ui.config({
    passwordSignupFields: 'EMAIL_ONLY', // name & problem title will be in the problem form
});