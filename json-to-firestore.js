const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const jobsData = require('./models/job.json');

const importJobsToFirestore = async () => {
  try {
    const collectionRef = db.collection('jobs');
    const snapshot = await collectionRef.get();
    
    const count = snapshot.size;
    console.log('Jumlah dokumen:', count);

    // const batch = db.batch();
    // const collectionRef = db.collection('jobs');

    // jobsData.forEach((job) => {
    //   const docRef = collectionRef.doc();
    //   batch.set(docRef, job);
    // });

    // await batch.commit();
    // console.log('Successfully import jobs to firestore');
  } catch (error) {
    console.error('Error:', error);
  }
};

importJobsToFirestore();

