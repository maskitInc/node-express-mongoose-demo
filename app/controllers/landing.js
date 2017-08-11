'use strict';

/**
 * Module dependencies.
 */

const { wrap: async } = require('co');
const only = require('only');
const { respond, respondOrRedirect } = require('../utils');

exports.var01 = async(function* (req, res) {
  respond(res, 'landing-var-01/index', {
    title: 'Landing variant 01',
    bodyID: 'landing-var-01'
  });
});

exports.var02 = async(function* (req, res) {
  respond(res, 'landing-var-02/index', {
    title: 'Landing variant 02',
    bodyID: 'landing-var-02'
  });
});
