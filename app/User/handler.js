'use strict';
const User = require('../../models/user');
const firebase = require('../../db');
const firestore = firebase.firestore();

module.exports = {
  handlerGetUserProfile: async (req, res, next) => {
    try {
      const { email } = req.user;
      
      const userSnapshot = await firestore.collection('users').where('email', '==', email).get();

      if (userSnapshot.empty) {
        return res.status(404).send({ status: 'error', message: 'User not found' });
      }

      let userData;
      userSnapshot.forEach((doc) => {
        userData = doc.data();
      });

      return res.status(200).send({
        status: 'success',
        message: 'Successfully get user data',
        user: userData,
      });
      
    } catch (error) {
      next(error);
    }
  },
  handlerUpdateUserProfile: async (req, res, next) => {
    try {
      
    } catch (error) {
      next(error);
    }
  },
  handlerUpdatePhotoProfile: async (req, res, next) => {
    try {
      
    } catch (error) {
      next(error);
    }
  },
  handlerDeletePhotoProfile: async (req, res, next) => {
    try {
      
    } catch (error) {
      next(error);
    }
  }
};