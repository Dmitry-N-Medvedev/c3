import {
  AsyncLocalStorage,
} from 'async_hooks';

const als = new AsyncLocalStorage();

const commandHandlers = Object.freeze({
  'get:orders': async (command) => {
    return [
      {
        title: 'Test Order 1',
        bookingDate: '22.06.2019',
        address: 'Wriezener Str. 12',
        customer: 'Emad Alam',
      },
      {
        title: 'Test Order 2',
        bookingDate: '23.06.2019',
        address: 'Mitte 12',
        customer: 'Jan Runo',
      }
    ];
  },
});

export const get = async (req, res, next) => {
  als.run({ body: [] }, () => {
    req.on('data', (chunk) => {
      const { body } = als.getStore();

      body.push(chunk);
    });
    req.on('end', async () => {
      const {
        body
      } = als.getStore();
      const command = Buffer.concat(body).toString();

      let result = [];

      try {
        result = await commandHandlers['get:orders'](command) || [];
      } catch (error) {
        result = JSON.stringify(error.message);
      }

      res.end(JSON.stringify(result));
    });
  });
};
