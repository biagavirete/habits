import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appRoutes } from './routes';

const app = Fastify();
const port = 3333;

app.register(cors);
app.register(appRoutes);

app.listen({
  port,
}).then(() => {
  console.log(`Listening on port ${port}`);
});