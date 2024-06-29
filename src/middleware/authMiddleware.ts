import { Context, Next } from 'hono';
import { verifyToken } from '../utils/jwt';

/**
 * Middleware to verify and authorize the user based on JWT token.
 * @param {Context} c - The Hono context object.
 * @param {Next} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves when the authorization process is complete.
 */
export const authMiddleware = async (c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization');
    const path = c.req.url.split('/');

    if (path[path.length - 1] === 'register') {
        await next();
        return;
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
