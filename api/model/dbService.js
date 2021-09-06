const AWS = require('aws-sdk');

AWS.config.region = 'eu-west-2';
const lambda = new AWS.Lambda();

async function getData() {
  const params = {
    FunctionName: 'training-connect-s3'
  };
  const request = await lambda.invoke(params, () => {}).promise();
  return request;
}

async function writeData(utilData) {
  const params = {
    FunctionName: 'training-upload-s3',
    Payload: Buffer.from(JSON.stringify(utilData))
  };
  const request = await lambda.invoke(params, () => {}).promise();
  return request;
}

module.exports = {
  fetchData: getData,
  updateData: writeData
};
