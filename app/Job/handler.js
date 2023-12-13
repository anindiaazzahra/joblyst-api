'use strict';
const firebase = require('../../db');
const firestore = firebase.firestore();

module.exports = {
  handlerGetJobByPosition: async (req, res, next) => {
    try {
      const { jobPosition } = req.query;
      
      const jobSnapshot = await firestore.collection('jobs').where('jobPosition', '==', jobPosition).get();
      if (jobSnapshot.empty) {
        return res.status(404).send({ 
          status: 'error', 
          message: 'Job not found' });
      }

      const jobsData = [];
      jobSnapshot.forEach((doc) => {
        jobsData.push(doc.data());
      });

      return res.status(200).send({
        status: 'success',
        message: 'Successfully get jobs data',
        jobs: jobsData,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetJobByFilter: async (req, res, next) => {
    try {
      const filters = ['jobCategory', 'jobLevel', 'workTime', 'city', 'rangeSalary'];
      const queryParams = req.query;

      const query = filters.reduce((acc, filter) => {
        if (queryParams[filter]) {
          return acc.where(filter, '==', queryParams[filter]);
        }
        return acc;
      }, firestore.collection('jobs'));

      const jobSnapshot = await query.get();

      if (jobSnapshot.empty) {
        return res.status(404).send({ 
          status: 'error', 
          message: 'Job not found' 
        });
      }

      const jobsData = jobSnapshot.docs.map((doc) => doc.data());

      return res.status(200).send({
        status: 'success',
        message: 'Successfully get jobs data',
        jobs: jobsData,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetRandomJob: async (req, res, next) => {
    try {
      const jobSnapshot = await firestore.collection('jobs').get();

    if (jobSnapshot.empty) {
      return res.status(404).send({ 
        status: 'error', 
        message: 'Job not found' 
      });
    }

    const jobsData = [];
    jobSnapshot.forEach((doc) => {
      jobsData.push(doc.data());
    });

    const shuffledJobs = jobsData.sort(() => Math.random() - 0.5);
    const limitedRandomJobs = shuffledJobs.slice(0, 30);

    return res.status(200).send({
      status: 'success',
      message: 'Successfully get random job',
      jobs: limitedRandomJobs,
    });
    } catch (error) {
      next(error);
    }
  },
};