import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import { sendMessage } from './routes';

const app = fastify();

app.register(fastifyCors, {
  origin: '*',
});

app.register(sendMessage)

const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

app
  .listen({
    port: 3333,
    host,
  })
  .then(() => console.log('Server is listening'))
  .catch((err) => console.error(err));