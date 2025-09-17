const axios = require('axios');
const dns = require('dns');

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2VvcmdlICBHZW9yZ2lhZGlzIiwiZmlyc3ROYW1lIjoiR2VvcmdlIiwibGFzdE5hbWUiOiJHZW9yZ2lhZGlzIiwiZW1haWwiOiJnZW9yZ2VAaGFwcGllcmxlYWRzLmNvbSIsImdvb2dsZUlkIjoiMTA2MzkyODE2MTc1MjE3MzQ1MDA1IiwiYWNjb3VudElkIjoiNjAxNzMzMWJjZWRmZjUwMTE0YTU5OWY1Iiwicm9sZSI6Ik93bmVyIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pMYXFLR1dDaXBoeTZBTE94TGd3UWVjdkx3SlROWWkwWXFHSnZGNDZGZUhsMnZQNzhHPXM5Ni1jIiwiZW1haWxWZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNzEyMjU3ODc2LCJleHAiOjE3NDM3OTM4NzYsImF1ZCI6Ik93bmVyIiwiaXNzIjoiaHR0cHM6Ly93d3cuaGFwcGllcmxlYWRzLmNvbSIsInN1YiI6IjVmZTliZDA5NTUxOTAzMDAzOGZmZmVkYyJ9.nX3MhaMHz-pLfYC0Yo6vZ903JKyh5-xxigTcs8q0MbU';
// axios.get('https://rest-admin.happierleads.com/admin/account', { headers: { 'Authorization': `Bearer ${token}`}})
//  .then((res) => console.log('result: ', res.data))
//  .catch (e => console.log('erro: ', e));

// const email = 'george@happierleads.com';
// const password = 'qawsedstation0';

// axios.post('https://rest-scanning.happierleads.com/admin/login', { email, password })
//  .then((res) => console.log('result: ', res.data))
//  .catch((e) => console.log('err: ', e));
const myId = '1200380146692028';
const NIDA_URL = 'http://105.179.0.124:2050/turikumwe_goodlink/nid/' + myId;

axios.get(NIDA_URL, { headers: {'Content-Type': 'application/json'}})
    .then((res) => console.log('result: ', res.data))
    .catch((e) => console.log('err: ', e));