'use strict';
const firebase = require('../../db');
const firestore = firebase.firestore();
const imageServices = require('../../utils/fileUpload');

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
  handlerGetJobCategories: async (req, res, next) => {
    try {
      const jobCategories = await firestore.collection('jobCategories').get();

      if (jobCategories.empty) {
        return res.status(404).send({ 
          status: 'error', 
          message: 'Job category not found' 
        });
      }

      const jobCategoriesData = [];
      jobCategories.forEach((doc) => {
        jobCategoriesData.push(doc.data());
      });

      return res.status(200).send({
        status: 'success',
        message: 'Successfully get job categories',
        jobCategories: jobCategoriesData,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetSalaries: async (req, res, next) => {
    try {
      const salaries = await firestore.collection('salaries').get();

      if (salaries.empty) {
        return res.status(404).send({ 
          status: 'error', 
          message: 'Salary not found' 
        });
      }

      const salariesData = [];
      salaries.forEach((doc) => {
        salariesData.push(doc.data());
      });

      return res.status(200).send({
        status: 'success',
        message: 'Successfully get salaries',
        salaries: salariesData,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetJobLevels: async (req, res, next) => {
    try {
      const jobLevels = await firestore.collection('jobLevels').get();

      if (jobLevels.empty) {
        return res.status(404).send({ 
          status: 'error', 
          message: 'Job level not found' 
        });
      }

      const jobLevelsData = [];
      jobLevels.forEach((doc) => {
        jobLevelsData.push(doc.data());
      });

      return res.status(200).send({
        status: 'success',
        message: 'Successfully get job levels',
        jobLevels: jobLevelsData,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetWorkTimes: async (req, res, next) => {
    try {
      const workTimes = await firestore.collection('workTimes').get();

      if (workTimes.empty) {
        return res.status(404).send({ 
          status: 'error', 
          message: 'Work time not found' 
        });
      }

      const workTimesData = [];
      workTimes.forEach((doc) => {
        workTimesData.push(doc.data());
      });

      return res.status(200).send({
        status: 'success',
        message: 'Successfully get work times',
        workTimes: workTimesData,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetCities: async (req, res, next) => {
    try {
      const cities = await firestore.collection('cities').get();

      if (cities.empty) {
        return res.status(404).send({ 
          status: 'error', 
          message: 'City not found' 
        });
      }

      const citiesData = [];
      cities.forEach((doc) => {
        citiesData.push(doc.data());
      });

      return res.status(200).send({
        status: 'success',
        message: 'Successfully get cities',
        cities: citiesData,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetJobs: async (req, res, next) => {
    try {
      const { q } = req.query;
      let jobSnapshot = await firestore.collection('jobs');

      if (q) {
        const endKeyword = q + '\uf8ff';
        jobSnapshot = jobSnapshot.orderBy('jobPosition').startAt(q).endAt(endKeyword);
      }
      jobSnapshot = await jobSnapshot.get();

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

      return res.status(200).send({
        status: 'success',
        message: 'Successfully get job',
        jobs: jobsData,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetAllJobs: async (req, res, next) => {
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

      return res.status(200).send({
        status: 'success',
        message: 'Successfully get all jobs',
        jobs: jobsData,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerUploadFile: async (req, res) => {
    const file = {
      type: req.file.mimetype,
      buffer: req.file.buffer
    }

    if (!req.file) {
      return res.status(400).send({
        status: "error",
        message: "No file uploaded",
      });
    }
  
    try {
      const imageUrl = await imageServices.uploadImage(file); 
  
      return res.status(200).send({
        status: "success",
        message: "File uploaded successfully",
        file: imageUrl,
      });
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "Error uploading file",
        error: error.message,
      });
    }
  }
};