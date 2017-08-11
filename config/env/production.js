'use strict';

/**
 * Expose
 */

module.exports = {
  db: process.env.PROD_MONGODB,
  facebook: {
    clientID: process.env.FACEBOOK_CLIENTID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: 'dl-corp.herokuapp.com/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_CLIENTID,
    clientSecret: process.env.TWITTER_SECRET,
    callbackURL: 'dl-corp.herokuapp.com/auth/twitter/callback'
  },
  github: {
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'dl-corp.herokuapp.com/auth/github/callback'
  },
  linkedin: {
    clientID: process.env.LINKEDIN_CLIENTID,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: 'dl-corp.herokuapp.com/auth/linkedin/callback'
  },
  google: {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: 'dl-corp.herokuapp.com/auth/google/callback'
  }
};
