'use strict';

/**
 * Module dependencies.
 */

const { wrap: async } = require('co');
const only = require('only');
const { respond, respondOrRedirect } = require('../utils');

exports.var01 = async(function* (req, res) {
  respond(res, 'main-var-01/index', {
    title: 'Main variant 01',
    bodyID: 'main-var-01'
  });
});
