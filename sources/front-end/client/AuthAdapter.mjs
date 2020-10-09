import Cookies from 'js-cookie';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {
  AuthServiceMessages,
} from '../services/constants/AuthServiceMessages.mjs';

export class AuthAdapter {
  #session = null;

  constructor(session) {
    this.#session = session;

    window.addEventListener('message', this.handleMessage);

    firebase.auth().onIdTokenChanged(async (user) => {
      try {
        if (!user) {
          Cookies.remove('token');
          session.set({
            user: false,
          });

          return;
        }

        const userToken = await user.getIdToken();

        Cookies.set('token', userToken);
        session.set({
          user: userToken,
        });
      } catch (error) {
        console.error(error);

        Cookies.remove('token');
        session.set({
          user: false,
        });
      }
    });
  }

  destroy() {
    window.removeEventListener('message', this.handleMessage);
  }

  handleMessage({ data }) {
    if (data.type === AuthServiceMessages.signedInWithEmailAndPassword.type) {
      console.debug(`AuthAdapter.handleMessage[${AuthServiceMessages.signedInWithEmailAndPassword.type}]`, data.payload);
    }
  }
};
