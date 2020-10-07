import {
  AsyncLocalStorage,
} from 'async_hooks';

const als = new AsyncLocalStorage();

const handleDataChunk = (chunk) => {
  const { body } = als.getStore();

  body.push(chunk);
};

const commandHandlers = Object.freeze({
  'get:orders': async (command) => {
    return [
      {
        id: 0,
        title: 'Test Order 1',
        bookingDate: '22.06.2019',
        address: 'Wriezener Str. 12',
        customer: 'Emad Alam',
      },
      {
        id: 0,
        title: 'Test Order 2',
        bookingDate: '23.06.2019',
        address: 'Mitte 12',
        customer: 'Jan Runo',
      }
    ];
  },
});

export const post = async (req, res, next) => {
  als.run({ body: [] }, () => {
    req.on('data', handleDataChunk);
    req.on('end', async () => {
      const {
        body
      } = als.getStore();
      const command = JSON.parse(Buffer.concat(body).toString());
      let result = [];

      try {
        result = await commandHandlers[command.op](command) || [];
      } catch (error) {
        result = JSON.stringify(error.message);
      }

      console.debug('command/result', command, result);

      res.end(JSON.stringify(result));
    });
  });
};
