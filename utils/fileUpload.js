const admin = require('firebase-admin');
require('dotenv').config();

async function uploadImage(file) {
  const storageFB = admin.storage();
  const dateTime = Date.now();
  const fileName = `company-logos/${dateTime}`;
  const storageRef = storageFB.bucket().file(fileName);
  const metadata = {
    contentType: file.type,
  };
  await storageRef.save(file.buffer, { metadata });

  const firebaseStorageURL = `https://firebasestorage.googleapis.com/v0/b/${storageFB.bucket().name}/o/${encodeURIComponent(fileName)}?alt=media`;
  return firebaseStorageURL;
}

const imageServices = {
  uploadImage,
};

module.exports = imageServices;