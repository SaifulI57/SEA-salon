import { Hono } from 'hono';
import { authMiddleware } from '../middleware/authMiddleware';
import Branch from '../Controllers/Branch';
const app = new Hono();

app.post('/', authMiddleware, Branch.createBranch);
app.put('/', authMiddleware, Branch.updateBranch);
app.get('/', authMiddleware, Branch.getBranchByName);
app.delete('/', authMiddleware, Branch.deleteBranch);

export default app;
