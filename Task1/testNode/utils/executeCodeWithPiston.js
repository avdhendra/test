const { octokit } = require('./auth');

require('dotenv').config();
async function executeCode (code)  {
    try {
    // Prepare the request payload for the PISTON API
    const payload = {
      language: 'javascript',
      source: code,
    };

    // Send the request to the PISTON API
    const response = await fetch(process.env.PISTON_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Parse the response JSON
    const result = await response.json();

    // Extract the output from the response
    const output = result.output;

    // Post the output as a comment on the pull request
    octokit.rest.issues.createComment({
      owner: payload.repository.owner.login,
      repo: repositoryName,
      issue_number: pullRequestId,
      body: `Output: ${output}`,
    });
  } catch (error) {
    console.error('Error executing code:', error);
  }
}

module.exports = {
    executeCode
}