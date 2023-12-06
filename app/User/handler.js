'use strict';
const User = require('../../models/user');
const firebase = require('../../db');
const firestore = firebase.firestore();
const { 
  validateUpdateUserSchema
} = require('../../validator/User');
const imageServices = require('../../utils/fileUpload');

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

      const userData = (await userRef.get()).data();

      if (req.file) {
        const file = {
          type: req.file.mimetype,
          buffer: req.file.buffer
        }
        
        const imageUrl = await imageServices.uploadImage(file); 
        await userRef.update({
          photoProfile: imageUrl || userData.photoProfile || null,
        });
      } 

      await userRef.update({
        username: username || userData.username || null,
        fullName: fullName || userData.fullName || null,
        phoneNumber: phoneNumber || userData.phoneNumber || null,
        address: address || userData.address || null,
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
  }
};