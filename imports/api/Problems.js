import { Mongo } from 'meteor/mongo';
import PropTypes from 'prop-types';

export default Problems = new Mongo.Collection('problems');

export const ProblemType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,

    description: PropTypes.string,
    reason: PropTypes.string,
    actions: PropTypes.string
});