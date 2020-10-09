import serviceAccount from '../configs/serviceAccountKey.mjs';
import admin from 'firebase-admin';
import {
  AsyncLocalStorage,
} from 'async_hooks';

const als = new AsyncLocalStorage();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const usersRef = db.collection('users');

const fetchUserInfo = async (userId) => {
  const result = Object.freeze({
    email: null,
    name: null,
    phone: null,
    uid: null,
  });

  const snapshot = await usersRef.where('uid', '==', userId).get();

  if (snapshot.empty) {
    return result;
  }

  return {
    ...result,
    ...(snapshot.docs[0]).data(),
  };
};

export const post = async (req, res, next) => {
  als.run({ body: [] }, () => {
    req.on('data', (chunk) => {
      const { body } = als.getStore();

      body.push(chunk);
    });

    req.on('end', async () => {
      const { body } = als.getStore();
      const { userId } = JSON.parse(Buffer.concat(body).toString());
      const userInfo = await fetchUserInfo(userId);

      res.end(JSON.stringify(userInfo));
    });
  });
};
