'use strict';

const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');
const firebase = require('firebase');
const User = require('../../models/user');
const db = require('../../db');
const firestore = db.firestore();
const { 
  validateRegisterSchema, 
  validateLoginSchema 
} = require('../../validator/User');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://joblyst-api-project.appspot.com'
});

if (!firebase.apps.length) {
  firebase.initializeApp(serviceAccount);
}

module.exports = {
  handlerRegisterUser: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      validateRegisterSchema({ username, email, password });
      const user = await admin.auth().createUser({
        username,
        email,
        password,
        emailVerified: false,
        disabled: false
      });

      const userData = {
        username,
        email,
      };

      await firestore.collection('users').doc().set(userData);

      return res.status(200).send({
        status: "success",
        message: "Successfully register user",
        uid : user.uid
      });
    } catch (error) {
      next(error);
    }    
  },
  handlerLoginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      validateLoginSchema({ email, password });
      const auth = firebase.default.auth();
      const user = await auth.signInWithEmailAndPassword(email, password);
      const token = await user.user.getIdToken();

      return res.status(200).send({
        status: "success",
        message: "Successfully logged in",
        accessToken : token,
      });
    } catch (error) {
      next(error);
    }
  }
};