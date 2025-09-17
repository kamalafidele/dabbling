const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// Your GitHub username
const username = 'kamalafidele';

// Your personal access token
const accessToken = process.env.GITHUB_TOKEN;

// Function to fetch events
async function fetchEvents(page = 1, events = []) {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/events?page=${page}`, {
            headers: {
                'Authorization': `token ${accessToken}`
            }
        });

        const fetchedEvents = response.data;

        console.log('unfiltered ', fetchedEvents.length);
        // Filtering WatchEvents and ForkEvents
        const relevantEvents = fetchedEvents.filter(event => event.type === 'WatchEvent' || event.type === 'ForkEvent');

        // Extracting repository names
        console.log('filtered events: ', relevantEvents.length);
        relevantEvents.forEach(event => {
            const repoName = event.repo.name;
            events.push(repoName);
        });

        // Checking for pagination
        const nextPage = response.headers.link ? response.headers.link.match(/<([^>]+)>;\s*rel="next"/) : null;
        if (nextPage) {
            const nextPageUrl = nextPage[1];
            const nextPageNumber = new URLSearchParams(nextPageUrl).get('page');
            return fetchEvents(nextPageNumber, events);
        } else {
            return events;
        }
    } catch (error) {
        console.error('Error fetching events:', error.message);
        return events;
    }
}

// Fetching events and printing repository names
async function getRepositories() {
    try {
        const repositories = await fetchEvents();
        const uniqueRepositories = [...new Set(repositories)]; // Removing duplicates
        uniqueRepositories.forEach(repo => console.log(repo));
    } catch (error) {
        console.error('Error getting repositories:', error.message);
    }
}

// Calling the function
getRepositories();
