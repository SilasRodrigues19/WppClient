import { FastifyInstance } from 'fastify';
import qrcode from 'qrcode-terminal';
const { Client } = require('whatsapp-web.js');

export const sendMessage = async (app: FastifyInstance) => {

  let isClientReady = false;

  app.get('/sendMessage', async (request, reply) => {
    try {
      const client = new Client();

      client.on('qr', qr => {

        if (!isClientReady) {
          reply.send({ qrCode: qr, message: 'QR Code generated. Scant it in integrated terminal' })
          qrcode.generate(qr, { small: true });
        }

      });

      client.on('ready', () => {
        console.log('Client is ready!');
        isClientReady = true;
      });

      client.on('message', async msg => {
        console.log('MESSAGE RECEIVED', msg);

        try {
          
          if (msg.body === '!ping') await client.sendMessage(msg.from, 'pong');
          

          if (msg.body && msg.body.toLowerCase() === 'oi') await client.sendMessage(msg.from, 'ola');
          
        } catch (err) {
          throw new Error(`Error when sending: ${err}`);
        }
      });

      await client.initialize();
    } catch (err) {
      throw new Error(`Error during initialization: ${err}`);
    }
  });
};
