/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path');
const dbService = require('../model/dbService');

const router = express.Router();

/* GET ROUTES
 */

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/course/index.html'));
});

router.get('/course', async (req, res) => {
  const { Payload } = await dbService.fetchData();
  const utilData = JSON.parse(Payload);
  res.send(utilData);
});

router.get('/course/:courseID', async (req, res) => {
  const { Payload } = await dbService.fetchData();
  const utilData = JSON.parse(Payload);
  const present = utilData.find((c) => c.courseID === req.params.courseID);
  res.send(present);
});

router.post('/course', async (req, res) => {
  const date = new Date();
  const { Payload } = await dbService.fetchData();
  const utilData = JSON.parse(Payload);
  const reqBody = req.body;
  if (utilData.length === 0) {
    reqBody.courseID = '0';
  } else {
    const id = parseInt(utilData[utilData.length - 1].courseID, 10) + 1;
    reqBody.courseID = `${id}`;
  }

  reqBody.createdAt = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  reqBody.modifiedAt = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  utilData.push(reqBody);
  const data = await dbService.updateData(utilData);
  res.send({
    cID: reqBody.courseID,
    coursesData: utilData,
  });
});

router.put('/course/:courseID', async (req, res) => {
  const date = new Date();
  const { Payload } = await dbService.fetchData();
  const utilData = JSON.parse(Payload);
  const reqBody = req.body;
  const present = utilData.find((c) => c.courseID === req.params.courseID);
  present.courseName = reqBody.courseName;
  present.subject = reqBody.subject;
  present.modifiedAt = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const data = await dbService.updateData(utilData);
  res.send(present);
});

router.delete('/course/:courseID', async (req, res) => {
  const { Payload } = await dbService.fetchData();
  const utilData = JSON.parse(Payload);
  const present = utilData.find((c) => c.courseID === req.params.courseID);
  const index = utilData.indexOf(present);
  utilData.splice(index, 1);
  const data = await dbService.updateData(utilData);
  res.send(present);
});

module.exports = router;
