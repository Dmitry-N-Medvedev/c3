import {
  ServiceProtocolMessages,
} from './constants/ServiceProtocolMessages.mjs';

export class MessageRouter {
  #workers = null;
  #routingTable = new Map();

  constructor(workers) {
    if (!workers) {
      throw new ReferenceError('workers are undefined');
    }

    if (!Array.isArray(workers)) {
      throw new TypeError('workers are not Array');
    }

    if (workers.length === 0) {
      throw new Error('workers array is empty');
    }

    this.#workers = workers;

    this.routeMessage = this.routeMessage.bind(this);
    this.handleWindowMessage = this.handleWindowMessage.bind(this);

    console.debug('MessageRouter.ctor', this.#workers);
  }

  defineSubscriptionsResponse(message) {
    const eventTypes = message?.data?.payload || [];

    eventTypes.forEach((eventType) => {
      const regExp = new RegExp(eventType);
      const regExpString = regExp.toString();

      if (this.#routingTable.has(regExp)) {
        (this.#routingTable.get(regExp)).push(message.srcElement);
      } else {
        this.#routingTable.set(regExp, [message.srcElement]);
      }
    });
  }

  routeMessage(message) {
    console.debug('MessageRouter.routeMessage:', message.data);

    switch (message.data.type) {
      // case ServiceProtocolMessages.defineSubscriptionsResponse.type: {
      //   this.defineSubscriptionsResponse(message);

      //   message.srcElement.__c3__.defineSubscriptionsResponse = true;

      //   if (this.#workers.some((worker) => worker.__c3__.defineSubscriptionsResponse !== true) === false) {

      //   }

      //   break;
      // }
      default: {
        console.debug('MessageRouter no default handler for:', message);

        window.postMessage(message.data);
      }
    }
  }

  handleWindowMessage(message) {
    console.debug('MessageRouter.handleWindowMessage:', message.data, this.#routingTable);

    this.#routingTable.forEach((workers, regExp) => {
      if (regExp.test(message.data.type) === true) {
        workers.forEach((worker) => {
          worker.postMessage(message.data);
        });
      }
    });
  }

  async start() {
    return new Promise((resolve, reject) => {
      const requestWokersSubscriptions = () => new Promise((res, rej) => {
        for (const worker of this.#workers) {
          worker.__c3__ = {
            defineSubscriptionsResponse: false,
          };
    
          worker.onmessage = (message) => {
            if (message.data.type === ServiceProtocolMessages.defineSubscriptionsResponse.type) {
              this.defineSubscriptionsResponse(message);
    
              message.srcElement.__c3__.defineSubscriptionsResponse = true;
    
              if (this.#workers.some((worker) => worker.__c3__.defineSubscriptionsResponse !== true) === false) {
                return res();
              }
            } else {
              throw new TypeError('this type of message MUST not occur at this phase', message);
            }
          };
      
          worker.postMessage(ServiceProtocolMessages.defineSubscriptionsRequest);
        }
      });

      requestWokersSubscriptions()
        .then(() => {
          for (const worker of this.#workers) {
            worker.onmessage = this.routeMessage;
          }

          window.addEventListener('message', this.handleWindowMessage);

          console.debug('MessageRouter.start');

          return resolve();
        });
    });
  }

  async stop() {
    window.removeEventListener('message', this.handleWindowMessage);

    this.#routingTable.clear();

    console.debug('MessageRouter.stop');
  }
}