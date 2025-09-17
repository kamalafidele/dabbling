const moment = require('moment');
const startDate = new Date();

// console.log(moment(startDate).format('YYYY/MM/DD'));
// console.log(startDate)

// var given = moment('28/05/2023', 'DD/MM/YYYY');;
// var current = moment().startOf('day');

//Difference in number of days
// const diff = moment.duration(given.diff(current)).asDays();
// console.log('given: ', given);
// console.log('current: ', current);
// console.log(diff);


// REVERSING DATES
// const reverse = (str) => {
//   const splitted = str.split('/');
//   return `${splitted[2]}/${splitted[1]}/${splitted[0]}`;
// };

// // Incrementing date
// const tomorrow = new Date();
// console.log('today: ', tomorrow);
// tomorrow.setDate(tomorrow.getDate() + 1);

// console.log('tomorrow: ', tomorrow);

// const date = moment(new Date()).format('DD-MM-YYYY');
// console.log(`Date: ${date}`);

let lastTimeRead = moment().subtract(3, 'hours');
console.log(lastTimeRead.toDate())