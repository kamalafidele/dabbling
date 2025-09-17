const fs = require('fs');
const https = require('https');
const { parse } = require('json2csv');

const API_URL = 'https://api.tenga.rw/api/lottery/sms/all';
const API_KEY = 'your_api_key_here'; // Replace with your actual API key
const PAGE_SIZE = 1000;
let currentPage = 0;
let allMessages = [];

function fetchMessages(page) {
    return new Promise((resolve, reject) => {
        const url = `${API_URL}?page=${page}&limit=${PAGE_SIZE}`;
        const options = {
            headers: {
                'Authorization': `API-KEY ${API_KEY}`
            }
        };

        https.get(url, options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                const response = JSON.parse(data);
                if (response.success) {
                    resolve(response.data);
                } else {
                    reject(new Error('API request failed'));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function fetchAllMessages() {
    while (true) {
        console.log(`Fetching page ${currentPage}...`);
        const data = await fetchMessages(currentPage);
        const deliveredMessages = data.content.filter(msg => msg.delivered);
        allMessages = allMessages.concat(deliveredMessages);

        if (data.last) {
            break;
        }
        currentPage++;
    }
}

function saveToCSV(messages) {
    const fields = ['createdAt', 'recipientPhoneNumber', 'message', 'title'];
    const opts = { fields };
    try {
        const csv = parse(messages, opts);
        fs.writeFileSync('sms-data.csv', csv);
        console.log('Data saved to sms-data.csv');
    } catch (err) {
        console.error(err);
    }
}

(async () => {
    try {
        await fetchAllMessages();
        saveToCSV(allMessages);
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
})();