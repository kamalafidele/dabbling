const axios = require('axios');

// Your GitHub username
const username = '';

// Your personal access token
const accessToken = '';

async function getRepositories() {
    try {
        const { data } = await axios.get(`https://api.github.com/repositories`, {
            headers: {
                'Authorization': `token ${accessToken}`
            }
        });

        console.log(data.map((t) => ({ name: t.full_name })));
    } catch (e) {
        console.log('error: ', e);
    }
}

getRepositories().then(() => console.log('finished'));