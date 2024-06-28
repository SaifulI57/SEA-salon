import { Context, Next } from 'hono';
import { verifyToken } from '../utils/jwt';

export const authMiddleware = async (c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization');
    const path = c.req.url.split('/');
    if (path[path.length - 1] == 'register') {
        await next();
    }
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded: any = verifyToken(token);
        if (decoded.role === 'CUSTOMER') {
            return c.json({ error: 'Unauthorized' }, 401);
        }
        c.set('user', decoded);
        await next();
    } catch (error) {
        return c.json({ error: 'Unauthorized' }, 401);
    }
};
