// const fs = require('fs');
// const path = require('path');

// // Path to your CSV file
// const csvPath = '/Users/phantom_x/Downloads/enoti_logs_db_public_audit_logs.csv';

// // Regex for common phone number formats
// const phoneRegex = /(?:\+\d{1,3}[\s-]?)?(?:\(\d{2,4}\)[\s-]?|\d{2,4}[\s-]?)?\d{3,4}[\s-]?\d{3,4}/g;

// fs.readFile(csvPath, 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading file:', err);
//     return;
//   }
//   // Find all phone numbers
//   const matches = data.match(phoneRegex) || [];
//   // Remove duplicates and trim whitespace
//   const phoneNumbers = Array.from(new Set(matches.map(num => num.trim())));
//   console.log(phoneNumbers.slice(0, 100));
//   console.log(phoneNumbers.slice(100, 200));
//   console.log(phoneNumbers.slice(200, 233));
// });
const axios = require('axios');


const numbers = [
  "0787688811",
  "0789571212",
  "0780904682",
  "0791579413",
  "0798477018",
  "0788671830"
];


/* 
Example of request to send:
{
    "consumerFrstNm": "NYABYENDA",
    "consumerLstNm": "Eric",
    "consumerOthNm": "",
    "consumerMblNo": "0794555312",
    "consumerEmail": null,
    "prvncNm": "SOUTH/Umujyi wa Kigali",
    "dstrctNm": "Huye",
    "sctrNm": "Mbazi",
    "locDesc": "Kigarama",
    "nid": "1199080036690383",
    "regId": "0794555312",
    "regDt": "20250815114256",
    "optedInToLottery": true
}
*/

async function fetchNIDADetails(phoneNumber) {
  try {
    const response = await axios.get(`http://10.10.101.85/api/auth/open/fetch/citizen-info/${phoneNumber}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching NIDA details for ${phoneNumber}:`, error.message);
    return null;
  }
}

async function registerToRRA() {
    // https://myrraconnect.rra.gov.rw/vat/reward/consumer/ussd/register
    /* 
    bODY: {
    "consumerMblNo": "0733058626",
    "nid": "1200180065594023"
}
    */

    for (const number of numbers) {
        try {
            const nidaDetails = await fetchNIDADetails(number);
            if (nidaDetails) {
                const requestData = {
                    consumerMblNo: number,
                    nid: nidaDetails.DocumentNumber.replace(/\s+/g, "")
                };
                console.log('nid: ', requestData.nid);
                const API_KEY = "tsk_001_44d268254839b24f46756c55dfa22e2ec8a052d97a7c83b01504788e3d7f7106";
                const registrationUrl = "https://myrraconnect.rra.gov.rw/vat/reward/consumer/ussd/register";
                try {
                    const response = await axios.post(registrationUrl, requestData, { headers: { "API-KEY": API_KEY } });
                    console.log(`Successfully registered to RRA ${number} - ${requestData.nid}:`, response.data);
                } catch (error) {
                    console.error(`Error registering to RRA ${number}:`, error.message);
                }
            } else {
                console.log(`No NIDA details found for ${number}`);
            }
        } catch(e){
            console.error(`Error processing ${number}:`, e.message);
        }
    }
}

async function registerUsers() {
    for (const number of numbers) {
        try {
        const nidaDetails = await fetchNIDADetails(number);
        if (nidaDetails) {
            const requestData = {
                consumerFrstNm: nidaDetails.Surnames,
                consumerLstNm: nidaDetails.ForeName,
                consumerOthNm: "",
                consumerMblNo: number,
                consumerEmail: nidaDetails.email || null,
                prvncNm: convertProvince(nidaDetails.Province) || "",
                dstrctNm: nidaDetails.District || "",
                sctrNm: nidaDetails.Sector || "",
                locDesc: `${nidaDetails.Village}, ${nidaDetails.Cell || ""}`,
                nid: nidaDetails.DocumentNumber.replace(/\s+/g, ""),
                regId: number,
                regDt: "20250818114256",
                optedInToLottery: true
            };
            const API_KEY = "V3E5M0MxNktxY0ttQzdnbFlGa0hqckFmYW11STgwUWxrMFU2cUtYRUlBY1diakNPUlY=";
            const registrationUrl = "http://10.10.101.85/api/auth/users/new-user";
            try {
                const response = await axios.post(registrationUrl, requestData, { headers: { "Authorization": `API-KEY ${API_KEY}` } });
                console.log(`Successfully registered ${number} - ${requestData.nid}:`, response.data);
            } catch (error) {
                console.error(`Error registering ${number}:`, error.message);
            }
        } else {
            console.log(`No NIDA details found for ${number}`);
        }
        } catch(e){
            console.error(`Error processing ${number}:`, e.message);
        }
    }
}


function convertProvince(province) {
    const provinceMap = {
        "Umujyi wa Kigali": "Umujyi wa Kigali",
        "Amajyaruguru": "NORTH",
        "Amajyepfo": "SOUTH",
        "Iburasirazuba": "EAST",
        "Iburengerazuba": "WEST"
    };
    return provinceMap[province] || province;
}

async function extractNationalIdFromNumbers() {
    const nationalIds = [];
    for (const number of numbers) {
        try {
            const nidaDetails = await fetchNIDADetails(number);
            if (nidaDetails) {
                nationalIds.push(nidaDetails.DocumentNumber.replace(/\s+/g, ""));
                console.log(`Fetched NID for ${number}: ${nidaDetails.DocumentNumber.replace(/\s+/g, "")}`);
            } else {
                console.log(`No NIDA details found for ${number}`);
            }
        } catch(e){
            console.error(`Error processing ${number}:`, e.message);
        }
    }

    console.log('All extracted NIDs:', nationalIds.length);
    console.log(nationalIds);

    return nationalIds;
}


// registerUsers().then(() => {
//     console.log("All users registered successfully.");
// }).catch((error) => {
//     console.error("Error registering users:", error);
// });


// registerToRRA().then(() => {
//     console.log("All users registered to RRA successfully.");
// }).catch((error) => {
//     console.error("Error registering users to RRA:", error);
// });

extractNationalIdFromNumbers().then((nids) => {
    console.log("finished Extracting NIDs:", nids.length);
}).catch((error) => {
    console.error("Error extracting NIDs:", error);
});