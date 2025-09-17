const router = require('express').Router();
const AWS = require('aws-sdk');
const { check, validationResult }  = require("express-validator");

const AWS_REGIONS = [
  'us-east-1',
  'us-east-2',
  'us-west-1',
  'us-west-2',
  'eu-west-1',
  'eu-west-2',
  'eu-west-3',
  'eu-central-1',
  'eu-north-1',
  'eu-south-1',
  'ap-northeast-1',
  'ap-northeast-2',
  'ap-northeast-3',
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-southeast-3',
  'ap-south-1',
  'ap-east-1',
  'af-south-1',
  'sa-east-1',
  'ca-central-1',
  'me-central-1',
  'me-south-1',
];

router.get('/servers',
 [
  check('access_key_id', 'access_key_id is Required').exists().not().isEmpty(),
  check('secret_access_key', 'secret_access_key is Required').exists().not().isEmpty(),
 ], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

  const { access_key_id, secret_access_key } = req.query;
  
  AWS.config.credentials = {
    accessKeyId: access_key_id,
    secretAccessKey: secret_access_key,
  }

  const servers = [];

  for(const aws_region of AWS_REGIONS) {
    AWS.config.update({ region: aws_region });
    const ec2 = new AWS.EC2();
   try {
    const data = await ec2.describeInstances().promise();
    const reservations = data.Reservations;
     for(const reservation of reservations) 
       for(const instance of reservation.Instances) {
        const filteredData = {
          instanceId: instance.InstanceId,
          server_name: instance.KeyName,
          server_region: instance.Placement.AvailabilityZone,
          status: instance.State.Name,
          ip_address: instance.PublicIpAddress
        }
        servers.push(filteredData);
       }
   } catch (e) {
    console.log(e);
   } 
  }

  return res.status(200).json(servers);
});

module.exports = router;
