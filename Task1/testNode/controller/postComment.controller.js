const { octokit } = require("../utils/auth");



function postComment(req, res) {
    const eventType = req.headers['x-github-event'];
    const payload = req.body;

    if (eventType === 'pull_request') {
        // Retrieve pull request details
        const pullRequestId = payload.pull_request.id;
        const repositoryName = payload.repository.name;

        // Get comments for the pull request
        octokit.rest.issues.listComments({
            owner: payload.repository.owner.login,
            repo: repositoryName,
            issue_number: pullRequestId,
        })
            .then(async (response) => {
                const comments = response.data;

                // Check if the pull request contains the specific command
                const command = '/execute';
                const commentWithCommand = comments.find(comment =>
                    comment.body.includes(command)
                );

                if (commentWithCommand) {
                    // Execute code and capture the output
                    const code = commentWithCommand.body.split(command)[1].trim();
                   await executeCode(code)
                }
            });
    }
}

module.exports = {
    postComment
}