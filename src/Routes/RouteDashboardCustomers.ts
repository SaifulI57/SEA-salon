import { Hono } from 'hono';
import { register, login } from '../Controllers/Auth';
import { authMiddleware } from '../middleware/authMiddleware';

const app = new Hono();

app.post('/register', register);

app.post('/login', login);

export default app;
