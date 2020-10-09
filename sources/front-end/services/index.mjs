import {
  fixOmtPath,
} from './helpers/fixOmtPath.mjs';
import authServiceURL from 'omt:./auth/index.mjs';
import {
  ServiceProtocolMessages,
} from './constants/ServiceProtocolMessages.mjs';
import {
  MessageRouter,
} from './MessageRouter.mjs';

let messageRouter = null;

const services = {
  auth: {
    modulePath: fixOmtPath(authServiceURL),
    object: null,
    state: null,
  },
};

const loadOrder = Object.freeze([
  'auth',
]);

const createMessageRouter = async () => {
  const serviceObjects = Object.values(services).map((service) => service.object);

  messageRouter = new MessageRouter(serviceObjects);

  return messageRouter.start();
};

const destroyMessageRouter = async () => {
  return messageRouter.stop();
};

const instantiateServices = () => {
  for (const serviceName of loadOrder) {
    try {
      (services[serviceName]).object = new Worker((services[serviceName]).modulePath, {
        type: 'module',
        name: serviceName,
      });

      console.debug(`${serviceName} instantiated`);

    } catch (error) {
      console.error(error);
  
      throw error;
    }
  }
};

const startEachService = () => new Promise((resolve, reject) => {
  const serviceStartUpTimeout = setTimeout(() => {
    clearTimeout(serviceStartUpTimeout);

    throw new Error('services have not started in timely manner');
  }, 1000);

  const isAllServicesStarted = () => {
    if (Object.values(services).some((service) => service.state !== ServiceProtocolMessages.started.type) === false) {
      clearTimeout(serviceStartUpTimeout);

      console.debug('all services have been started');

      createMessageRouter()
        .then(() => {
          return resolve();
        });
    }
  };

  const setServiceState = (serviceName, serviceState) => {
    (services[serviceName]).state = serviceState;

    console.debug(`${serviceName} moved to ${serviceState} state`);

    if (isAllServicesStarted() === true) {
      console.debug('all services have been started');

      return resolve();
    }
  };

  for (const serviceName of loadOrder) {
    try {
      (services[serviceName]).object.onmessage = ({ data }) => {
        (services[serviceName]).object.onmessage = null;

        setServiceState(serviceName, data.type);
      };

      (services[serviceName]).object.postMessage(ServiceProtocolMessages.start);
    } catch (error) {
      console.error(error);

      throw error;
    }
  }
});

export const startServices = async () => {
  instantiateServices();

  return startEachService();
};

export const stopServices = () => new Promise((resolve, reject) => {
  const serviceTerminateTimeout = setTimeout(() => {
    clearTimeout(serviceTerminateTimeout);

    throw new Error('services have not terminated in timely manner');
  }, 1000);

  const isAllServicesTerminated = () => {
    return Object.values(services).some((service) => service.object !== null) === false;
  };

  for (const [name, service] of Object.entries(services)) {
    service.object.onmessage = ({ data }) => {
      console.debug(`received ${JSON.stringify(data)} from ${name}`);

      service.object.onmessage = null;
      service.object.terminate();
      service.object = null;

      if (isAllServicesTerminated()) {
        clearTimeout(serviceTerminateTimeout);

        console.debug('all services have been terminated');

        destroyMessageRouter()
          .then(() => {
            return resolve();
          });
      }
    };
  
    console.debug(`sending ${ServiceProtocolMessages.stop} signal to ${name}`);

    service.object.postMessage(ServiceProtocolMessages.stop);
  }
});
