const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');
const firebase = require('firebase');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

if (!firebase.apps.length) {
  firebase.initializeApp(serviceAccount);
}

module.exports = {
  handlerRegisterUser: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      // validateRegisterUserSchema({ username, email, password });
      const user = await admin.auth().createUser({
        username,
        email,
        password,
        emailVerified: false,
        disabled: false
      });
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
      // validateLoginUserSchema({ email, password });
      const auth = firebase.default.auth();
      const user = await auth.signInWithEmailAndPassword(email, password);
      return res.status(200).send({
        status: "success",
        message: "Successfully login user",
        accessToken : user.user.refreshToken
      });
    } catch (error) {
      next(error);
    }
  }
};