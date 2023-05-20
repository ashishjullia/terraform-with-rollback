const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

async function run() {
    // This should be a token with access to your repository scoped in as a secret.
    // The YML workflow will need to set myToken with the GitHub Secret Token
    // myToken: ${{ secrets.GITHUB_TOKEN }}
    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
    // const myToken = core.getInput('myToken');

    // const octokit = github.getOctokit(myToken)

    // // You can also pass in additional options as a second parameter to getOctokit
    // // const octokit = github.getOctokit(myToken, {userAgent: "MyActionVersion1"});

    // const { data: pullRequest } = await octokit.rest.pulls.get({
    //     owner: 'octokit',
    //     repo: 'rest.js',
    //     pull_number: 123,
    //     mediaType: {
    //       format: 'diff'
    //     }
    // });
    try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet', { required: true });
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
    fs.readdir('.', (err, files) => {
        if (err) {
          console.error(err);
          return;
        }
      
        console.log(files);
      });
      
    } catch (error) {
    core.setFailed(error.message);
    }
}

run();
