import { Mongo } from 'meteor/mongo';
import PropTypes from 'prop-types';

export default Unsubs = new Mongo.Collection('unsubs');

export const ProblemType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
});