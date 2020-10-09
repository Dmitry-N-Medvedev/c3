import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../src/configs/firebaseConfig.mjs';
import Cookies from 'js-cookie';
import {
  ServiceProtocolMessages,
} from '../constants/ServiceProtocolMessages.mjs';
import {
  AuthServiceMessages,
} from '../constants/AuthServiceMessages.mjs';

const eventTypes = Object.freeze([
  // NOTE:
  // if your service does not want to subscribe for notifications
  // define here just a single pattern: /^$/
  /^auth:req:(.)+$/isu,
]);

let session = null;

const start = () => {
  firebase.initializeApp(firebaseConfig);

  self.postMessage(ServiceProtocolMessages.started);
};

const stop = () => {
  self.postMessage(ServiceProtocolMessages.stopped);
};

const handleDefineSubscriptionsRequest = () => {
  const message = {
    ...ServiceProtocolMessages.defineSubscriptionsResponse,
    ...{
      payload: eventTypes,
    }
  }

  self.postMessage(message);

  console.debug('auth::handleDefineSubscriptionsRequest', message);
};

const signInWithEmailAndPassword = async (data) => {
  const { payload: { email, password }} = data;

  const authResult = await firebase.auth().signInWithEmailAndPassword(email, password);

  console.debug('auth::signInWithEmailAndPassword', email, password, authResult);

  const result = {
    ...AuthServiceMessages.signedInWithEmailAndPassword,
    ...{
      payload: {
        user: {
          uid: authResult.user.uid,
        },
      },
    },
  };

  console.debug('auth::signInWithEmailAndPassword', result);

  self.postMessage(result);
};

const signOut = async () => {
  console.debug('auth::signOut handler');

  await firebase.auth().signOut();

  self.postMessage(AuthServiceMessages.signedOut);
};

const handleIncomingMessage = (data) => {
  switch (data.type) {
    case ServiceProtocolMessages.start.type: {
      return start();
    }
    case ServiceProtocolMessages.stop.type: {
      return stop();
    }
    case ServiceProtocolMessages.defineSubscriptionsRequest.type: {
      return handleDefineSubscriptionsRequest();
    }
    case AuthServiceMessages.signInWithEmailAndPassword.type: {
      return signInWithEmailAndPassword(data);
    }
    case AuthServiceMessages.signOut.type: {
      return signOut();
    }
    default: {
      console.log('auth: unknown message:', data);
    }
  }
};

onmessage = ({ data }) => {
  handleIncomingMessage(data);
};
