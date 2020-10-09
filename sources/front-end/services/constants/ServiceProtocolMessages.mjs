export const ServiceProtocolMessages = Object.freeze({
  start: {
    type: 'service:req:start',
  },
  started: {
    type: 'service:res:start',
  },
  stop: {
    type: 'service:req:stop',
  },
  stopped: {
    type: 'service:res:stop',
  },
  defineSubscriptionsRequest: {
    type: 'service:req:defineSubscriptions',
  },
  defineSubscriptionsResponse: {
    type: 'service:res:defineSubscriptions',
    payload: {},
  },
});
