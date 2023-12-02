'use strict';
const User = require('../../models/user');
const firebase = require('../../db');
const firestore = firebase.firestore();
const { 
  validateUpdateUserSchema
} = require('../../validator/User');

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
      const { email } = req.user;
      const { username, fullName, phoneNumber, address } = req.body;
      validateUpdateUserSchema({ username, fullName, phoneNumber, address });
      
      const userSnapshot = await firestore.collection('users').where('email', '==', email).get();
      if (userSnapshot.empty) {
        return res.status(404).send({ status: 'error', message: 'User not found' });
      }

      let userRef;
      userSnapshot.forEach((doc) => {
        userRef = doc.ref;
      });
      
      await userRef.update({
        username: username || firestore.FieldValue.delete(),
        fullname: fullName || firestore.FieldValue.delete(),
        phoneNumber: phoneNumber || firestore.FieldValue.delete(),
        address: address || firestore.FieldValue.delete(),
      });
    
      const updatedUserData = (await userRef.get()).data();

      return res.status(200).send({
        status: 'success',
        message: 'Successfully update user data',
        user: updatedUserData,
      });
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