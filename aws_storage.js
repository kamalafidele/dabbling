const fs = require('fs');
const dotenv = require('dotenv');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

dotenv.config();

const { AWS_ACCESS_KEY, AWS_ACCESS_SECRET_ID, BUCKET_ID } = process.env;

const s3 = new S3Client({
    region: 'GRA',
    apiVersion: 'latest',
    endpoint: 'https://s3.gra.io.cloud.ovh.net/',
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_ACCESS_SECRET_ID,
    },
});

(async () => {
    try {
        
        // fs.writeFileSync('acasus.com.png', object.Body);
        // console.log('finished to download the file');

        const data = fs.readFileSync('./KLASHNIKOV.png');
        const command = new PutObjectCommand({ Bucket: BUCKET_ID, Key: 'KLASHNIKOV.png', Body: data });

        await s3.send(command);
        console.log('uploaded');

    } catch (e) {
        console.log('an error occurred!: ', e);
    }
})();

