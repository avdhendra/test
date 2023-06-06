const { Octokit } = require('@octokit/rest');
require('dotenv').config();
const octokit = new Octokit({
  auth: {
    appId: process.env.GITHUB_APP_ID,
    privateKey: process.env.GITHUB_PRIVATE_KEY,
  },
});

module.exports = {
    octokit
}