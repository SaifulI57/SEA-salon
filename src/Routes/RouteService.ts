import { Hono } from 'hono';
import Service from '../Controllers/Services';
import { authMiddleware } from '../middleware/authMiddleware';

const app = new Hono();

app.post('/', authMiddleware, Service.createServices);
app.put('/', authMiddleware, Service.updateServices);
app.get('/', Service.getServicesName);
app.delete('/', authMiddleware, Service.deleteServices);

export default app;
